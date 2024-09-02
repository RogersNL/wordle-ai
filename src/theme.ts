import { createTheme } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import createBreakpoints from "@mui/system/createTheme/createBreakpoints";
const breakpointsDef = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
  },
};
const breakpoints = createBreakpoints({ ...breakpointsDef });
const theme = createTheme({
  breakpoints: { ...breakpoints },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#bd7d92",
          light: "#d79fae",
          dark: "#9e6078",
          contrastText: "##4a4a4a",
        },
        secondary: {
          main: "#8f4c64",
          light: "#b37086",
          dark: "#6c3245",
          contrastText: "##4a4a4a",
        },
        background: {
          // default: "#f5f5f5",
          default: "#faf0e6",
          // default: "#fdf0f3",
        },
        error: {
          main: "#d75a6c",
          light: "#e58b99",
          dark: "#b34856 ",
          contrastText: "#ffffff",
        },
        warning: {
          main: "#ffaf5f",
          light: "#ffc889",
          dark: "#e5953c",
          contrastText: "rgba(0, 0, 0, 0.87)",
        },
        info: {
          main: "#4242424f",
          light: "#90c0e6",
          dark: "#548bb3",
          contrastText: "#ffffff",
        },
        success: {
          main: "#7aa37c",
          light: "#95b997",
          dark: "#62825d",
          contrastText: "#ffffff",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#bd7d92",
          light: "#d79fae",
          dark: "#9e6078",
          contrastText: "#ffffff",
        },
        secondary: {
          main: "#8f4c64",
          light: "#b37086",
          dark: "#6c3245",
          contrastText: "#ffffff",
        },
        background: {
          // default: "#2d2d2d",
          // default: "#1a1e2b",
          default: "#3a2c3f",
        },
        info: {
          main: "#424242",
          light: "#90c0e6",
          dark: "#548bb3",
          contrastText: "#ffffff",
        },
      },
    },
  },
  cssVariables: {
    colorSchemeSelector: "class",
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {},
          [breakpoints.down("md")]: {
            minWidth: "45px",
          },
          [breakpoints.down("sm")]: {
            minWidth: "35px",
          },
        },
      },
    },
    MuiInputBase: {
      defaultProps: {
        disabled: false,
      },
      styleOverrides: {
        root: {},
      },
    },
  },
});

export default theme;
