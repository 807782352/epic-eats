import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../utils/theme";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const Staff = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns: GridColDef<(typeof mockDataTeam)[number]>[] = [
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
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "access",
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
            width="100%"
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
  ];

  return (
    <Box m={4}>
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box sx={{ height: "75vh", width: "100%", marginTop: "16px" }}>
        <DataGrid
          rows={mockDataTeam}
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
              fontWeight: "bold"
            },
            "& .last-name-column": {
              color: colors.greenAccent[800],
              fontWeight: "bold"
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
