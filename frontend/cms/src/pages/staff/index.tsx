import { Box, Button, Typography, useTheme } from "@mui/material";
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

const Staff = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [staffData, setStaffData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStaffs = () => {
    setIsLoading(true);
    getStaffs()
      .then((res) => {
        console.log(res);
        setStaffData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
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
      fetchStaffs();
      toast.success("Status updated successfully!");
    } catch (error) {
      toast.error("Failed to update status!");
    }
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
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    { field: "phone", headerName: "Phone", flex: 1 },
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
      flex: 1,
      renderCell: ({ value }) => {
        let cellColor;
        switch (value) {
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
            {value === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {value === "manager" && <ManageAccountsOutlinedIcon />}
            {value === "staff" && <WorkOutlineOutlinedIcon />}
            {value === "user" && <PersonOutlineOutlinedIcon />}
            <Typography color={colors.grey[900]}>{value}</Typography>
          </Box>
        );
      },
    },
    { field: "updateTime", headerName: "Update Time", flex: 1 },
    { field: "createTime", headerName: "Create Time", flex: 1 },
    {
      field: "operations",
      headerName: "Operations",
      flex: 1,
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
            >
              <Typography color={colors.greenAccent[700]} fontWeight={"bold"}>
                EDIT
              </Typography>
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                handleActivate(id);
              }}
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
      <Header title="TEAM" subtitle="Managing the Team Members" />
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

            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.primary[200],
            },
          }}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
        />
      </Box>
    </Box>
  );
};

export default Staff;
