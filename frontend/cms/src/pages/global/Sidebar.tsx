import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { tokens } from "../../utils/theme";
import { useState } from "react";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import profileImg from "../../assets/profile.jpg";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";

const Item = ({ title, icon, to, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      icon={icon}
      onClick={() => setSelected(title)}
      component={<Link to={to} />}
      rootStyles={{
        color: colors.grey[800],
        backgroundColor:
          selected === title ? colors.greenAccent[400] : "transparent",
      }}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box>
      <ProSidebar
        collapsed={isCollapsed}
        backgroundColor={colors.primary[200]}
        rootStyles={{
          border: "none",
          height: "100%",
        }}
      >
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&:hover`]: {
                color: colors.grey[900],
                backgroundColor: colors.greenAccent[500],
              },
            },
          }}
        >
          {/* LOGO & MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed && <MenuOutlinedIcon />}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                color={colors.grey[1000]}
              >
                Epic Eats System
              </Typography>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          </MenuItem>

          {/* PROFILES  */}
          {!isCollapsed && (
            <Box
              display="flex"
              flexDirection="column"
              gap={1}
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <img
                src={profileImg}
                width="100px"
                height="100px"
                alt=""
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  color={colors.grey[1000]}
                  mt={1}
                >
                  Ziyi Xu
                </Typography>
                <Typography
                  variant="h5"
                  color={colors.greenAccent[700]}
                  mt={0.5}
                >
                  Admin
                </Typography>
              </Box>
            </Box>
          )}

          {/* MENU ITEMS  */}
          <Box mt={2} paddingLeft={!isCollapsed ? "10%" : undefined}>
            <Item
              title="Dashboard"
              icon={<DashboardOutlinedIcon />}
              to={"/"}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[600]}
              sx={{ margin: "8px 0 4px 16px" }}
            >
              Group
            </Typography>
            <Item
              title="Staff"
              icon={<GroupsOutlinedIcon />}
              to={"/staff"}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Form"
              icon={<GroupAddOutlinedIcon />}
              to={"/form"}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h6"
              color={colors.grey[600]}
              sx={{ margin: "8px 0 4px 16px" }}
            >
              Menu
            </Typography>
            <Item
              title="Dishes"
              icon={<RestaurantMenuOutlinedIcon />}
              to={"/dishes"}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Category"
              icon={<CategoryOutlinedIcon />}
              to={"/category"}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[600]}
              sx={{ margin: "8px 0 4px 16px" }}
            >
              Order
            </Typography>
            <Item
              title="Order"
              icon={<ReceiptOutlinedIcon />}
              to={"/order"}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
