import "./App.css";
import { ColorModeContext, tokens, useMode } from "./utils/theme";
import { Route, Routes } from "react-router-dom";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Topbar from "./pages/global/Topbar";
import Home from "./pages/home";

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
              {/* <Route path="/staff" element={<Staff />}></Route>
              <Route path="/form" element={<Form />}></Route>
              <Route path="/dishes" element={<Dishes />}></Route>
              <Route path="/category" element={<Category />}></Route>
              <Route path="/order" element={<Order />}></Route> */}
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
