import "./App.css";
import { ColorModeContext, tokens, useMode } from "./utils/theme";
import { Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Topbar from "./pages/global/Topbar";
import Home from "./pages/home";
import Footer from "./pages/global/Footer";
import Menu from "./pages/menu";

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
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/home" element={<Home />}></Route>
              <Route path="/menu/:dishId" element={<Menu />} />
              <Route path="/menu/categoryId/:categoryId" element={<Menu />} />
              <Route path="/menu" element={<Navigate to="/menu/categoryId/1" />} />
            </Routes>
            <Footer />
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
