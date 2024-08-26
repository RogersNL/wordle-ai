import { Box, Stack, Typography } from "@mui/material";
import theme from "../theme";

const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        backgroundColor: "#bd7d92",
      }}
    >
      <Stack direction="row">
        <Box component="img" src=""></Box>
        <Typography
          variant="h1"
          sx={{
            [theme.breakpoints.down("sm")]: {
              fontSize: "3rem",
            },
          }}
        >
          Wordle
        </Typography>
      </Stack>
    </Box>
  );
};
export default Header;
