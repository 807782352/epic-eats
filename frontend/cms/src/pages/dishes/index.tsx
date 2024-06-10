import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Drawer,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../utils/theme";
import Header from "../../components/Header";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getDishes } from "../../api/dishes";
import DishForm from "../../components/DishForm";

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
  const [open, setOpen] = useState(false);
  const [selectedDishId, setSelectedDishId] = useState(null);

  // used for Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = (id) => {
    setDrawerOpen(true);
    setSelectedDishId(id);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedDishId(null);
  };

  const handleDialogOpen = (id) => {
    setOpen(true);
    setSelectedDishId(id);
  };
  const handleDialogClose = () => {
    setOpen(false);
    setSelectedDishId(null);
  };

  const columns: GridColDef<(typeof dishData)[number]>[] = [
    { field: "id", headerName: "ID" },
    { field: "image", headerName: "Image" },
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
    { field: "price", headerName: "Price" },
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
      renderCell: ({ row: { activate, id } }) => {
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
              onClick={() => handleDrawerOpen(id)}
            >
              <Typography color={colors.greenAccent[700]} fontWeight={"bold"}>
                EDIT
              </Typography>
            </Button>

            <Button
              variant="outlined"
              size="small"
              onClick={() => handleDialogOpen(id)}
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
                {activate ? "SUSPEND" : "ACTIVATE"}
              </Typography>
            </Button>
          </Box>
        );
      },
    },
  ];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log("dishData", dishData);

  return (
    <Box m={4}>
      <Box display="flex" alignItems="end" justifyContent="space-between">
        <Header title="Dishes" subtitle="Managing the Menu Dishes" />

        <Button
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
        open={drawerOpen}
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
      <Dialog
        open={open}
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
          <Typography variant="h3">{"Activate / Suspend Staff"}</Typography>
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
            {/* <Typography variant="h5">
              Are you sure you want to{" "}
              {selectedDishId &&
              dishData.find((dish) => dish.id === selectedDishId)?.activate
                ? "SUSPEND"
                : "ACTIVATE"}{" "}
              [
              {
                dishData.find((dish) => dish.id === selectedDishId)
                  ?.name
              }
            </Typography> */}
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
