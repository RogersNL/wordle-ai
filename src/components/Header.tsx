import { Box, Stack, Typography } from "@mui/material";

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
      <Stack direction="row">
        <Box component="img" src=""></Box>
        <Typography variant="h1">Wordle</Typography>
      </Stack>
    </Box>
  );
};
export default Header;
