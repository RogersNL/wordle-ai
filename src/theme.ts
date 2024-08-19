import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
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
