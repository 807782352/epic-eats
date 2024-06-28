import {
  Box,
  Button,
  Card,
  CardContent,
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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getOrders, updateOrderStatusById } from "../../api/order";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { toast } from "react-toastify";
import OrderForm from "../../components/OrderForm";

const Order = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // used for Dialog
  const [open, setOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // used for Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  // used for Order Items Dialog
  const [itemsDialogOpen, setItemsDialogOpen] = useState(false);
  const [selectedOrderItems, setSelectedOrderItems] = useState([]);

  const handleItemsDialogOpen = (items) => {
    setSelectedOrderItems(items);
    setItemsDialogOpen(true);
  };
  const handleItemsDialogClose = () => {
    setItemsDialogOpen(false);
    setSelectedOrderItems([]);
  };

  const handleDrawerOpen = (id) => {
    setDrawerOpen(true);
    setSelectedOrderId(id);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedOrderId(null);
  };

  const handleDialogOpen = (id) => {
    setOpen(true);
    setSelectedOrderId(id);
  };
  const handleDialogClose = () => {
    setOpen(false);
    setSelectedOrderId(null);
  };

  const fetchOrders = () => {
    setIsLoading(true);
    getOrders()
      .then((res) => {
        console.log("res.data", res.data);
        setOrderData(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
        console.log("order data:", orderData);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id) => {
    try {
      await updateOrderStatusById(id);
      toast.success("Status updated successfully!");
      handleDialogClose();
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update status!");
    }
  };

  const columns: GridColDef<(typeof orderData)[number]>[] = [
    { field: "orderId", headerName: "Order ID" },
    { field: "userId", headerName: "User ID" },
    { field: "userName", headerName: "User Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone" },
    {
      field: "orderItems",
      headerName: "Order Items",
      flex: 2,
      renderCell: ({ value }) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleItemsDialogOpen(value)}
          sx={{
            borderColor: colors.greenAccent[700],
            borderWidth: "2px",
            "&:hover": {
              backgroundColor: colors.greenAccent[500],
              borderColor: colors.greenAccent[500],
              boxShadow: "none",
              ".MuiTypography-root": {
                color: colors.grey[900],
              },
            },
          }}
        >
          <Typography color={colors.greenAccent[700]} fontWeight={"bold"}>
            View Items
          </Typography>
        </Button>
      ),
    },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "totalPrice", headerName: "Total Price", flex: 1 },
    { field: "orderDate", headerName: "Order Date", flex: 1 },
    {
      field: "operations",
      headerName: "Operations",
      flex: 2,
      sortable: false,
      renderCell: ({ row: { status, orderId } }) => {
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
                    color: colors.grey[900],
                  },
                },
              }}
              onClick={() => handleDrawerOpen(orderId)}
            >
              <Typography color={colors.greenAccent[700]} fontWeight={"bold"}>
                EDIT
              </Typography>
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleDialogOpen(orderId)}
              sx={{
                borderColor: colors.redAccent[700],
                borderWidth: "2px",
                "&:hover": {
                  backgroundColor: colors.redAccent[500],
                  borderColor: colors.redAccent[500],
                  boxShadow: "none",
                  ".MuiTypography-root": {
                    color: colors.grey[900],
                  },
                },
              }}
            >
              <Typography color={colors.redAccent[900]} fontWeight={"bold"}>
                {status === "in progress" && "finish"}
                {status === "finished" && "archive"}
                {status === "archived" && "retrieve"}
                {status === "error" && "restore"}
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
        <Header title="Orders" subtitle="Managing the Orders" />
      </Box>
      <Box sx={{ height: "75vh", width: "100%", marginTop: "16px" }}>
        <DataGrid
          rows={orderData}
          columns={columns}
          getRowId={(row) => row.orderId}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              border: "none",
              display: "flex",
              alignItems: "center",
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
            {
              field: "orderId",
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
          <Typography variant="h6">Update Order Info</Typography>
          <OrderForm id={selectedOrderId} fetchOrders={fetchOrders} />
        </Box>
      </Drawer>
      <Dialog
        open={open}
        onClose={handleDialogClose}
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
          <Typography variant="h3">{"Change Order Status"}</Typography>
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
              Are you sure you want to change the status of [
              {selectedOrderId &&
                orderData.find((order) => order.orderId === selectedOrderId)
                  ?.userName}{" "}
              ] ?
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
            onClick={() => handleStatusChange(selectedOrderId)}
            autoFocus
            sx={{
              color: colors.grey[900],
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={itemsDialogOpen}
        onClose={handleItemsDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          id="order-items-dialog-title"
          sx={{
            backgroundColor: colors.primary[400],
          }}
        >
          Order Items
        </DialogTitle>
        <DialogContent
          sx={{
            backgroundColor: colors.primary[400],
          }}
        >
          {selectedOrderItems.map((item) => (
            <Card
              key={item.orderItemId}
              variant="outlined"
              sx={{ mb: 2, backgroundColor: colors.primary[300] }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Dish Name: {item.dishName}
                </Typography>
                <Typography variant="body2">
                  <strong>Dish ID:</strong> {item.dishId}
                </Typography>
                <Typography variant="body2">
                  <strong>Quantity:</strong> {item.quantity}
                </Typography>
                <Typography variant="body2">
                  <strong>Price:</strong> ${item.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: colors.primary[400],
          }}
        >
          <Button
            onClick={handleItemsDialogClose}
            sx={{
              color: colors.primary[100],
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Order;
