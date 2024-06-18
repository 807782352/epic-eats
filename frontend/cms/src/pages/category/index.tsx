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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { tokens } from "../../utils/theme";
import { deleteCategoryById, getCategories } from "../../api/category";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import CategoryForm from "../../components/CategoryForm";
import { toast } from "react-toastify";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

const Category = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetching data
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await getCategories();
      setCategoryData(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.message || "An error occurred while fetching categories");
    } finally {
      setIsLoading(false);
    }
  };

  // fetch data in initial
  useEffect(() => {
    fetchCategories();
  }, []);

  // used for Drawer
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // used for Dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddDrawerOpen = () => {
    setAddDrawerOpen(true);
  };

  const handleUpdateDrawerOpen = (id) => {
    setUpdateDrawerOpen(true);
    setSelectedCategoryId(id);
  };

  const handleDrawerClose = () => {
    setUpdateDrawerOpen(false);
    setAddDrawerOpen(false);
    setSelectedCategoryId(null);
  };

  const handleDialogOpen = (id) => {
    setDialogOpen(true);
    setSelectedCategoryId(id);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedCategoryId(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategoryById(id);
      toast.success("Category deleted successfully!");
      handleDialogClose();
      fetchCategories();
    } catch (error) {
      toast.error("Failed to delete the category!");
    }
  };

  const columns: GridColDef<(typeof categoryData)[number]>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Category Name",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    { field: "updateTime", headerName: "Update Time", flex: 1 },
    { field: "createTime", headerName: "Create Time", flex: 1 },
    {
      field: "operations",
      headerName: "Operations",
      flex: 2,
      sortable: false,
      renderCell: ({ row: { id } }) => {
        return (
          <Box
            display="flex"
            alignItems="center"
            textAlign="center"
            height="100%"
            width="100%"
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
              onClick={(event) => {
                event.stopPropagation();
                handleUpdateDrawerOpen(id);
              }}
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
                DELETE
              </Typography>
            </Button>
          </Box>
        );
      },
    },
  ];

  if (isLoading) return <Loading sxProps={{ m: 4 }} />;
  if (error) return <Error errorMsg={error.message} sxProps={{ m: 4 }} />;

  return (
    <Box m={4}>
      <Box display="flex" alignItems="end" justifyContent="space-between">
        <Header title="Category" subtitle="Manage Dish Categories" />
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
            Add Category
          </Typography>
        </Button>
      </Box>

      <Box sx={{ height: "75vh", width: "100%", marginTop: "16px" }}>
        <DataGrid
          rows={categoryData}
          columns={columns}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.primary[200],
            },
            "& .MuiDataGrid-columnHeader": {
              borderBottom: "none",
              backgroundColor: colors.primary[200],
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiSvgIcon-root": {
              color: colors.grey[800],
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
          sortModel={[
            {
              field: "id",
              sort: "asc",
            },
          ]}
          pageSizeOptions={[5, 10, 25, 50]}
          checkboxSelection
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
          <Typography variant="h6">Update Category Info</Typography>
          <CategoryForm
            mode="update"
            id={selectedCategoryId}
            fetchCategories={fetchCategories}
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
          <Typography variant="h6">Add Category Info</Typography>
          <CategoryForm mode="add" fetchCategories={fetchCategories} />
        </Box>
      </Drawer>
      <Dialog
        open={dialogOpen}
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
          <Typography variant="h3">Delete Category</Typography>
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
              Are you sure you want to delete{" ["}
              {selectedCategoryId &&
                categoryData.find(
                  (category) => category.id === selectedCategoryId
                )?.name}
              {"] "}
              Category ?
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
            onClick={() => handleDelete(selectedCategoryId)}
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

export default Category;
