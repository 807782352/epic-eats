import "./App.css";
import { ColorModeContext, tokens, useMode } from "./utils/theme";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./pages/global/Sidebar";
import Topbar from "./pages/global/Topbar";
import Dashboard from "./pages/dashboard";
import Staff from "./pages/staff";
import Dishes from "./pages/dishes";
import Category from "./pages/category";
import Order from "./pages/order";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import Form from "./pages/form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            "*::-webkit-scrollbar": {
              width: "10px",
            },
            "*::-webkit-scrollbar-track": {
              background: colors.primary[500],
            },
            "*::-webkit-scrollbar-thumb": {
              background: colors.primary[200],
            },
            "*::-webkit-scrollbar-thumb:hover": {
              background: colors.grey[500],
            },
          }}
        />

        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/staff" element={<Staff />}></Route>
              <Route path="/form" element={<Form />}></Route>
              <Route path="/dishes" element={<Dishes />}></Route>
              <Route path="/category" element={<Category />}></Route>
              <Route path="/order" element={<Order />}></Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ColorModeContext.Provider>
  );
}

export default App;
