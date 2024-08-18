import React from "react";
import "./App.css";
import GameContent from "./components/GameContent";
import Header from "./components/Header";
import { Box } from "@mui/material";

const App = () => {
  return (
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
  );
};

export default App;
