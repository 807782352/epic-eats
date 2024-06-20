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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useEffect, useState } from "react";
import { getStaffs, patchStaffActivateById } from "../../api/staff";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import { toast } from "react-toastify";
import StaffForm from "../../components/SraffForm";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useNavigate } from "react-router-dom";

const Staff = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [staffData, setStaffData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // used for Dialog
  const [open, setOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  // used for Drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = (id) => {
    setDrawerOpen(true);
    setSelectedStaffId(id);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setSelectedStaffId(null);
  };

  const handleDialogOpen = (id) => {
    setOpen(true);
    setSelectedStaffId(id);
  };
  const handleDialogClose = () => {
    setOpen(false);
    setSelectedStaffId(null);
  };

  const fetchStaffs = () => {
    setIsLoading(true);
    getStaffs()
      .then((res) => {
        console.log(res);
        setStaffData(res);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  const handleActivate = async (id) => {
    try {
      await patchStaffActivateById(id);
      toast.success("Status updated successfully!");
      handleDialogClose();
      fetchStaffs();
    } catch (error) {
      toast.error("Failed to update status!");
    }
  };

  const handleNavigate = (url) => {
    navigate(url);
  };

  const columns: GridColDef<(typeof staffData)[number]>[] = [
    { field: "id", headerName: "ID" },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "first-name-column",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "last-name-column",
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone" },
    {
      field: "activate",
      headerName: "Activate",
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
    {
      field: "role",
      headerName: "Access Level",
      flex: 2,
      renderCell: ({ value: { role } }) => {
        let cellColor;
        switch (role) {
          case "admin":
            cellColor = colors.greenAccent[500];
            break;
          case "manager":
            cellColor = colors.greenAccent[400];
            break;
          case "staff":
            cellColor = colors.greenAccent[300];
            break;
          default:
            cellColor = colors.greenAccent[200];
            break;
        }
        return (
          <Box
            width="80%"
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={0.5}
            borderRadius={1}
            sx={{
              backgroundColor: cellColor,
              margin: "10px 0 ",
            }}
          >
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "manager" && <ManageAccountsOutlinedIcon />}
            {role === "staff" && <WorkOutlineOutlinedIcon />}
            {role === "user" && <PersonOutlineOutlinedIcon />}
            <Typography color={colors.grey[900]}>{role}</Typography>
          </Box>
        );
      },
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

  if (isLoading) return <Loading sxProps={{ m: 4 }} />;
  if (error) return <Error errorMsg={error.message} sxProps={{ m: 4 }} />;

  return (
    <Box m={4}>
      <Box display="flex" alignItems="end" justifyContent="space-between">
        <Header title="TEAM" subtitle="Managing the Team Members" />

        <Button
          onClick={() => handleNavigate("/form")}
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
            Add Staff
          </Typography>
        </Button>
      </Box>
      <Box sx={{ height: "75vh", width: "100%", marginTop: "16px" }}>
        <DataGrid
          rows={staffData}
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
          <Typography variant="h6">Update Staff Info</Typography>
          <StaffForm
            mode="update"
            id={selectedStaffId}
            fetchStaffs={fetchStaffs}
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
            <Typography variant="h5">
              Are you sure you want to{" "}
              {selectedStaffId &&
              staffData.find((staff) => staff.id === selectedStaffId)?.activate
                ? "SUSPEND"
                : "ACTIVATE"}{" "}
              [
              {
                staffData.find((staff) => staff.id === selectedStaffId)
                  ?.firstName
              }{" "}
              {
                staffData.find((staff) => staff.id === selectedStaffId)
                  ?.lastName
              }
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
            onClick={() => handleActivate(selectedStaffId)}
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

export default Staff;
