import { createTheme } from "@mui/material";
import { createContext, useMemo, useState } from "react";

type Mode = "light" | "dark";

export const tokens = (mode: Mode) => ({
  ...(mode === "dark" ? darkTheme : lightTheme),
});

const lightTheme = {
  primary: {
    100: "#fffae6",
    200: "#ffe7ba",
    300: "#ffd591",
    400: "#ffc069",
    500: "#ffa940",
    600: "#fa8c16",
    700: "#d46b08",
    800: "#ad4e00",
    900: "#873800",
    1000: "#612500",
  },
  greenAccent: {
    100: "#f2fff0",
    200: "#e4ffe0",
    300: "#b5f2ae",
    400: "#87e681",
    500: "#5bd957",
    600: "#32cd32",
    700: "#1fa624",
    800: "#128019",
    900: "#085910",
    1000: "#04330a",
  },
  blueAccent: {
    100: "#e6f4ff",
    200: "#bae7ff",
    300: "#91caff",
    400: "#69b1ff",
    500: "#4096ff",
    600: "#1677ff",
    700: "#0958d9",
    800: "#003eb3",
    900: "#002c8c",
    1000: "#001d66",
  },
  redAccent: {
    100: "#fff1f0",
    200: "#ffccc7",
    300: "#ffa39e",
    400: "#ff7875",
    500: "#ff4d4f",
    600: "#f5222d",
    700: "#cf1322",
    800: "#a8071a",
    900: "#820014",
    1000: "#5c0011",
  },
  grey: {
    100: "#fafafa",
    200: "#f5f5f5",
    300: "#f0f0f0",
    400: "#d9d9d9",
    500: "#bfbfbf",
    600: "#8c8c8c",
    700: "#595959",
    800: "#434343",
    900: "#1f1f1f",
    1000: "#141414",
  },
};

const darkTheme = {
  // invert the order
  primary: {
    1000: "#fffae6",
    900: "#ffe7ba",
    800: "#ffd591",
    700: "#ffc069",
    600: "#ffa940",
    500: "#fa8c16",
    400: "#d46b08",
    300: "#ad4e00",
    200: "#873800",
    100: "#612500",
  },
  greenAccent: {
    1000: "#f2fff0",
    900: "#e4ffe0",
    800: "#b5f2ae",
    700: "#87e681",
    600: "#5bd957",
    500: "#32cd32",
    400: "#1fa624",
    300: "#128019",
    200: "#085910",
    100: "#04330a",
  },
  blueAccent: {
    1000: "#e6f4ff",
    900: "#bae7ff",
    800: "#91caff",
    700: "#69b1ff",
    600: "#4096ff",
    500: "#1677ff",
    400: "#0958d9",
    300: "#003eb3",
    200: "#002c8c",
    100: "#001d66",
  },
  redAccent: {
    1000: "#fff1f0",
    900: "#ffccc7",
    800: "#ffa39e",
    700: "#ff7875",
    600: "#ff4d4f",
    500: "#f5222d",
    400: "#cf1322",
    300: "#a8071a",
    200: "#820014",
    100: "#5c0011",
  },
  grey: {
    1000: "#fafafa",
    900: "#f5f5f5",
    800: "#f0f0f0",
    700: "#d9d9d9",
    600: "#bfbfbf",
    500: "#8c8c8c",
    400: "#595959",
    300: "#434343",
    200: "#1f1f1f",
    100: "#141414",
  },
};

export const themeSettings = (mode: Mode) => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[300],
            },
            secondary: {
              main: colors.greenAccent[600],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[300],
            },
          }
        : {
            primary: {
              main: colors.primary[300],
            },
            secondary: {
              main: colors.greenAccent[400],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[300],
            },
          }),
    },
    typography: {
      fontFamily: ["Caveat" , "Source Sans 3", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Caveat" , "Source Sans 3", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Caveat" , "Source Sans 3", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Caveat" , "Source Sans 3", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Caveat" , "Source Sans 3", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Caveat" , "Source Sans 3", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Caveat" , "Source Sans 3", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// Context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState<Mode>("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "dark" ? "light" : "dark")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode] as const;
};
