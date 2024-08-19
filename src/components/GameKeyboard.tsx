import { Button, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";

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
          if (newKeyColors[letter] !== "green") {
            if (
              props.secretWord.toUpperCase().includes(letter) &&
              props.secretWord.toUpperCase()[index] === letter
            ) {
              newKeyColors[letter] = "green";
            } else if (props.secretWord.toUpperCase().includes(letter)) {
              newKeyColors[letter] = "yellow";
            } else {
              newKeyColors[letter] = "darkgray";
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
        type="button"
        onClick={() => handleOnPress(props.text)}
        sx={{
          color: "black",
          borderColor: "black",
          backgroundColor: props.backgroundColor,
        }}
      >
        {props.text}
      </Button>
    );
  };
  return (
    <Stack gap={1} sx={{ display: "flex", justifyContent: "center" }}>
      <Stack
        gap={1}
        direction="row"
        sx={{ display: "flex", justifyContent: "center" }}
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
        gap={1}
        direction="row"
        sx={{ display: "flex", justifyContent: "center" }}
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
        gap={1}
        direction="row"
        sx={{ display: "flex", justifyContent: "center" }}
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
