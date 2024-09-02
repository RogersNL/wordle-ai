import React from "react";
import "./App.css";
import GameContent from "./components/GameContent";
import Header from "./components/Header";
import { ThemeProvider, useColorScheme } from "@mui/material/styles";
import theme from "./theme";
import { Box } from "@mui/material";
import type {} from "@mui/material/themeCssVarsAugmentation";

const App = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  const toggleMode = (mode: "system" | "light" | "dark") => {
    setMode(mode);
  };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: (theme.vars || theme).palette.background.default,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      })}
    >
      <Header mode={mode} setMode={toggleMode} />
      <GameContent />
    </Box>
  );
};

export default function ToggleColorMode() {
  return (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
}
