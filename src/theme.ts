import { createTheme, minor } from "@mui/material";
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
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          [breakpoints.down("md")]: {
            minWidth: "45px",
          },
          [breakpoints.down("sm")]: {
            minWidth: "30px",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          ":focus": {
            borderColor: "black",
          },
          ":focus-visible": {
            borderColor: "black",
          },
        },
      },
    },
  },
});

export default theme;
