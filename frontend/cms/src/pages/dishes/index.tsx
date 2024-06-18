import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../utils/theme";
import Header from "../../components/Header";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
  changeDishDeleteById,
  changeDishStatusById,
  getDishes,
} from "../../api/dishes";
import DishForm from "../../components/DishForm";
import { currencyFormatter } from "../../utils/utils";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const Dishes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isLoading, setIsLoading] = useState(false);
  const [dishData, setDishData] = useState([]);
  const [error, setError] = useState(null);

  // fetch dishes data
  const fetchDishes = async () => {
    setIsLoading(true);
    try {
      const res = await getDishes();
      setDishData(res.data);
    } catch (err) {
      console.log(err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // render initially and fetch dishes data
  useEffect(() => {
    fetchDishes();
  }, []);

  // used for Dialog
  const [statusOpen, setStatusOpen] = useState(false);
  const [isDishDeleteOpen, setIsDishDeleteOpen] = useState(false);
  const [selectedDishId, setSelectedDishId] = useState(null);

  // used for Drawer
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);

  const handleAddDrawerOpen = () => {
    setAddDrawerOpen(true);
  };

  const handleUpdateDrawerOpen = (id) => {
    setUpdateDrawerOpen(true);
    setSelectedDishId(id);
  };

  const handleDrawerClose = () => {
    setAddDrawerOpen(false);
    setUpdateDrawerOpen(false);
    setSelectedDishId(null);
  };

  const handleStatusDialogOpen = (id) => {
    setStatusOpen(true);
    setSelectedDishId(id);
  };

  const handleDishDeleteDialogOpen = (id) => {
    setIsDishDeleteOpen(true);
    setSelectedDishId(id);
  };

  const handleDialogClose = () => {
    setSelectedDishId(null);
    setStatusOpen(false);
    setIsDishDeleteOpen(false);
    fetchDishes();
  };

  const handleIsDishDeleted = async (id) => {
    try {
      await changeDishDeleteById(id);
      toast.success("Dish status deleted/activated Successfully!");
      handleDialogClose();
    } catch (error) {
      toast.error("Failed to delete/activate dish!");
    }
  };

  const handleChangeStatus = async (id) => {
    try {
      await changeDishStatusById(id);
      toast.success("Dish status changed Successfully!");
      handleDialogClose();
      fetchDishes();
    } catch (error) {
      toast.error("Failed to change dish status!");
    }
  };

  const columns: GridColDef<(typeof dishData)[number]>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "image",
      headerName: "Image",
      width: 120,
      renderCell: ({ value }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={value}
            style={{
              width: "100%",
              maxWidth: "120px",
              maxHeight: "80%",
              objectFit: "cover",
            }}
          />
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column",
    },
    {
      field: "categoryName",
      headerName: "Category",
      flex: 1,
    },
    { field: "code", headerName: "Code", flex: 1 },
    {
      field: "price",
      headerName: "Price",
      valueFormatter: (value) => currencyFormatter.format(value),
    },
    { field: "description", headerName: "Description" },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ value }) => (
        <Box
          width="80%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          p={0.5}
          borderRadius={1}
          sx={{
            backgroundColor: value ? colors.greenAccent[500] : colors.grey[500],
            margin: "10px 0 ",
          }}
        >
          <Typography>{value ? "yes" : "no"}</Typography>
        </Box>
      ),
    },
    { field: "updateTime", headerName: "Update Time", flex: 1 },
    { field: "createTime", headerName: "Create Time", flex: 1 },
    {
      field: "operations",
      headerName: "Operations",
      flex: 2,
      sortable: false,
      renderCell: ({ row: { id, status, isDeleted } }) => {
        return (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap={2}
          >
            <Button
              variant="outlined"
              size="small"
              disabled={isDeleted === 1} // disable when it is deleted
              sx={{
                borderColor: colors.greenAccent[700],
                borderWidth: "2px",
                "&:hover": {
                  backgroundColor: colors.greenAccent[500],
                  borderColor: colors.greenAccent[500],
                  boxShadow: "none",
                  ".MuiTypography-root": {
                    // Hover will also change the color of the typography below
                    color: colors.grey[900],
                  },
                },
              }}
              onClick={() => handleUpdateDrawerOpen(id)}
            >
              <Typography color={colors.greenAccent[700]} fontWeight={"bold"}>
                EDIT
              </Typography>
            </Button>

            <Button
              variant="outlined"
              size="small"
              disabled={isDeleted === 1} // disable when it is deleted
              onClick={() => handleStatusDialogOpen(id)}
              sx={{
                borderColor: colors.redAccent[700],
                borderWidth: "2px",
                "&:hover": {
                  backgroundColor: colors.redAccent[500],
                  borderColor: colors.redAccent[500],
                  boxShadow: "none",
                  ".MuiTypography-root": {
                    // Hover will also change the color of the typography below
                    color: colors.grey[900],
                  },
                },
              }}
            >
              <Typography color={colors.redAccent[900]} fontWeight={"bold"}>
                {status ? "DELIST" : "LIST"}
              </Typography>
            </Button>

            <Button
              variant="outlined"
              size="small"
              onClick={() => handleDishDeleteDialogOpen(id)}
              sx={{
                borderColor: colors.grey[700],
                borderWidth: "2px",
                "&:hover": {
                  backgroundColor: colors.grey[500],
                  borderColor: colors.grey[500],
                  boxShadow: "none",
                  ".MuiTypography-root": {
                    // Hover will also change the color of the typography below
                    color: colors.grey[900],
                  },
                },
              }}
            >
              <Typography color={colors.grey[900]} fontWeight={"bold"}>
                {isDeleted ? "ACTIVATE" : "DELETE"}
              </Typography>
            </Button>
          </Box>
        );
      },
    },
  ];

  if (isLoading) return <Loading sxProps={{ m: 4 }} />;
  if (error) return <Error errorMsg={error.message} sxProps={{ m: 4 }} />;

  console.log("dishData", dishData);

  return (
    <Box m={4}>
      <Box display="flex" alignItems="end" justifyContent="space-between">
        <Header title="Dishes" subtitle="Manage the Menu Dishes" />

        <Button
          onClick={handleAddDrawerOpen}
          sx={{
            backgroundColor: colors.greenAccent[500],
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            "&:hover": {
              backgroundColor: colors.greenAccent[300],
            },
          }}
        >
          <AddOutlinedIcon sx={{ color: colors.grey[900] }} />
          <Typography
            variant="h6"
            pr={1}
            sx={{
              color: colors.grey[900],
            }}
          >
            Add Dish
          </Typography>
        </Button>
      </Box>
      <Box sx={{ height: "75vh", width: "100%", marginTop: "16px" }}>
        <DataGrid
          rows={dishData}
          columns={columns}
          getRowClassName={(params) =>
            params.row.isDeleted ? "deleted-row" : ""
          }
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              border: "none",
              display: "flex",
              alignItems: "center",
            },
            "& .first-name-column": {
              color: colors.greenAccent[800],
              fontWeight: "bold",
            },
            "& .last-name-column": {
              color: colors.greenAccent[800],
              fontWeight: "bold",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: colors.primary[200],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[300],
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.primary[200],
            },
            "& .MuiSvgIcon-root": {
              color: colors.grey[800],
            },
            // set deleted row as greyscale background
            "& .deleted-row": {
              backgroundColor: colors.grey[400],
            },

            "& .deleted-row:hover": {
              backgroundColor: colors.grey[400],
              cursor: "not-allowed",
            },
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          sortModel={[
            // sort "id" by default
            {
              field: "id",
              sort: "asc",
            },
          ]}
          pageSizeOptions={[5, 10, 25, 50]}
        />
      </Box>
      <Drawer
        anchor="right"
        open={updateDrawerOpen}
        onClose={() => handleDrawerClose()}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "transparent",
            },
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: colors.primary[300],
            width: "30%",
          },
        }}
      >
        <Box
          sx={{
            padding: 2,
          }}
        >
          <Typography variant="h6">Update Dish Info</Typography>
          <DishForm
            mode="update"
            id={selectedDishId}
            fetchDishes={fetchDishes}
          />
        </Box>
      </Drawer>
      <Drawer
        anchor="right"
        open={addDrawerOpen}
        onClose={() => handleDrawerClose()}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "transparent",
            },
          },
        }}
        PaperProps={{
          sx: {
            backgroundColor: colors.primary[300],
            width: "30%",
          },
        }}
      >
        <Box
          sx={{
            padding: 2,
          }}
        >
          <Typography variant="h6">Add Dish Info</Typography>
          <DishForm mode="add" fetchDishes={fetchDishes} />
        </Box>
      </Drawer>
      <Dialog
        open={statusOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "transparent",
              backdropFilter: "blur(1px)",
            },
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            backgroundColor: colors.primary[400],
          }}
        >
          <Typography variant="h3">{"List / Delist Dish"}</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: colors.primary[400],
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              color: colors.grey[800],
              paddingTop: 2,
            }}
          >
            <Typography variant="h5">
              Are you sure to{" "}
              {selectedDishId &&
              dishData.find((dish) => dish.id === selectedDishId)?.status
                ? "delist"
                : "list"}
              {" dish "}[
              {dishData.find((dish) => dish.id === selectedDishId)?.name}]
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: colors.primary[400],
          }}
        >
          <Button
            onClick={handleDialogClose}
            sx={{
              color: colors.grey[900],
            }}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={() => handleChangeStatus(selectedDishId)}
            sx={{
              color: colors.grey[900],
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isDishDeleteOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "transparent",
              backdropFilter: "blur(1px)",
            },
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            backgroundColor: colors.primary[400],
          }}
        >
          <Typography variant="h3">{"Activate / Delete Dish"}</Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: colors.primary[400],
          }}
        >
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              color: colors.grey[800],
              paddingTop: 2,
            }}
          >
            <Typography variant="h5">
              Are you sure to{" "}
              {selectedDishId &&
              dishData.find((dish) => dish.id === selectedDishId)?.isDeleted
                ? "activate"
                : "delete"}
              {" dish "}[
              {dishData.find((dish) => dish.id === selectedDishId)?.name}]
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: colors.primary[400],
          }}
        >
          <Button
            onClick={handleDialogClose}
            sx={{
              color: colors.grey[900],
            }}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={() => handleIsDishDeleted(selectedDishId)}
            sx={{
              color: colors.grey[900],
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dishes;
