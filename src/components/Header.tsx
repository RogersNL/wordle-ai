import { Box, Button, Typography } from "@mui/material";
import theme from "../theme";
import "../assets/strawberry.png";
import Grid2 from "@mui/material/Grid2";
import {
  DarkMode,
  DarkModeOutlined,
  LightModeOutlined,
} from "@mui/icons-material";
import { FC } from "react";
import type {} from "@mui/material/themeCssVarsAugmentation";

interface HeaderProps {
  mode: "system" | "light" | "dark";
  setMode: Function;
}

const Header: FC<HeaderProps> = (props) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        background: `linear-gradient(0deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        padding: "8px 0",
      }}
    >
      <Grid2 container sx={{ width: "100%" }}>
        <Grid2 size={2}></Grid2>
        <Grid2 size={8}>
          <Typography
            variant="h1"
            sx={(theme) => ({
              textAlign: "center",
              [theme.breakpoints.down("sm")]: {
                fontSize: "3rem",
              },
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              color: theme.vars.palette.background.default,
            })}
          >
            Wordle
          </Typography>
        </Grid2>
        <Grid2
          size={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.mode === "dark" ? (
            <Button onClick={() => props.setMode("light")}>
              <LightModeOutlined
                sx={(theme) => ({
                  color: theme.vars.palette.background.default,
                  [theme.breakpoints.up("md")]: {
                    fontSize: "40px",
                  },
                  [theme.breakpoints.up("sm")]: {
                    fontSize: "35px",
                  },
                  [theme.breakpoints.up("xs")]: {
                    fontSize: "25px",
                  },
                })}
              />
            </Button>
          ) : (
            <Button onClick={() => props.setMode("dark")}>
              <DarkMode
                sx={{
                  color: theme.vars.palette.background.default,
                  [theme.breakpoints.up("md")]: {
                    fontSize: "40px",
                  },
                  [theme.breakpoints.up("sm")]: {
                    fontSize: "35px",
                  },
                  [theme.breakpoints.up("xs")]: {
                    fontSize: "25px",
                  },
                }}
              />
            </Button>
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Header;
