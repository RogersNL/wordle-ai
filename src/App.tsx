import React from "react";
import "./App.css";
import GameContent from "./components/GameContent";
import Header from "./components/Header";
import { Box, ThemeProvider } from "@mui/material";
import theme from "./theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: "darkgray",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header />
        <GameContent />
      </Box>
    </ThemeProvider>
  );
};

export default App;
