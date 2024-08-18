import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        backgroundColor: "#5a995a",
      }}
    >
      <Typography variant="h1">Wordle AI</Typography>
    </Box>
  );
};
export default Header;
