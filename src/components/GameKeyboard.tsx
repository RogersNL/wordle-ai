import { Button, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import theme from "../theme";
import type {} from "@mui/material/themeCssVarsAugmentation";

interface GameKeyboardProps {
  onKeyPress: Function;
  secretWord: string;
  guesses: string[][];
  guessIndex: number;
}
const GameKeyboard: FC<GameKeyboardProps> = (props) => {
  const [keyColors, setKeyColors] = useState<{ [key: string]: string }>({});
  const row1: string[] = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const row2: string[] = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const row3: string[] = ["Z", "X", "C", "V", "B", "N", "M", "< BACK"];

  const allLetters = [...row1, ...row2, ...row3].reduce(
    (acc: { [key: string]: string }, curr) => (
      (acc[curr] = "transparent"), acc
    ),
    {}
  );

  useEffect(() => {
    setKeyColors((prevKeyColors) => {
      const newKeyColors = { ...allLetters, ...prevKeyColors };
      if (props.guessIndex - 1 >= 0) {
        props.guesses[props.guessIndex - 1].forEach((letter, index) => {
          if (newKeyColors[letter] !== theme.vars.palette.success.main) {
            if (
              props.secretWord.toUpperCase().includes(letter) &&
              props.secretWord.toUpperCase()[index] === letter
            ) {
              newKeyColors[letter] = theme.vars.palette.success.main;
            } else if (props.secretWord.toUpperCase().includes(letter)) {
              newKeyColors[letter] = theme.vars.palette.warning.main;
            } else {
              newKeyColors[letter] = theme.vars.palette.info.main;
            }
          }
        });
      }
      return newKeyColors;
    });
  }, [props.guessIndex]);

  interface KeyProps {
    text: string;
    onKeyPress: Function;
    backgroundColor: string;
  }
  const Key: FC<KeyProps> = (props) => {
    const handleOnPress = (text: string) => {
      const key = text === "< BACK" ? "Backspace" : text;
      props.onKeyPress(key);
    };

    return (
      <Button
        variant="outlined"
        color="secondary"
        type="button"
        onClick={() => handleOnPress(props.text)}
        sx={{
          backgroundColor: props.backgroundColor,
          color: theme.vars.palette.primary.contrastText,
          padding: "15px",
          fontSize: "1.3rem",
          [theme.breakpoints.down("sm")]: {
            padding: "10px 5px",
            fontSize: "0.9rem",
          },
        }}
      >
        {props.text}
      </Button>
    );
  };
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.up("sm")]: {
          gap: "8px",
        },
        [theme.breakpoints.up("xs")]: {
          gap: "2px",
        },
      }}
    >
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "center",
          [theme.breakpoints.up("sm")]: {
            gap: "8px",
          },
          [theme.breakpoints.up("xs")]: {
            gap: "2px",
          },
        }}
      >
        {row1.map((val, index) => (
          <Key
            key={index}
            text={val}
            onKeyPress={props.onKeyPress}
            backgroundColor={keyColors[val]}
          />
        ))}
      </Stack>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "center",
          [theme.breakpoints.up("sm")]: {
            gap: "8px",
          },
          [theme.breakpoints.up("xs")]: {
            gap: "2px",
          },
        }}
      >
        {row2.map((val, index) => (
          <Key
            key={index}
            text={val}
            onKeyPress={props.onKeyPress}
            backgroundColor={keyColors[val]}
          />
        ))}
      </Stack>
      <Stack
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "center",
          [theme.breakpoints.up("sm")]: {
            gap: "8px",
          },
          [theme.breakpoints.up("xs")]: {
            gap: "2px",
          },
        }}
      >
        {row3.map((val, index) => (
          <Key
            key={index}
            text={val}
            onKeyPress={props.onKeyPress}
            backgroundColor={keyColors[val]}
          />
        ))}
      </Stack>
    </Stack>
  );
};
export default GameKeyboard;
