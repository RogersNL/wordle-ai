import { Box, Stack, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import theme from "../theme";

interface GameRowProps {
  guessIndex: number;
  guess: string[];
  isDisabled: boolean;
  secretWord: string;
  handleSubmitGuess: Function;
}
const GameRow: FC<GameRowProps> = (props) => {
  const [letterBackgroundColors, setLetterBackgroundColors] = useState(
    Array(5).fill("")
  );
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = props.guess.join("");

    props.handleSubmitGuess(result);
  };

  useEffect(() => {
    if (!props.guess.includes("")) {
      const secretWordArray = props.secretWord.toUpperCase().split("");
      const guessArray = [...props.guess];

      // Handle assign green
      const greenBackgrounds = [...letterBackgroundColors].map((_, index) =>
        secretWordArray[index] === props.guess[index]
          ? theme.palette.success.main
          : ""
      );
      const leftoverSecret = secretWordArray.map((l, index) =>
        greenBackgrounds[index] !== theme.palette.success.main ? l : ""
      );
      const leftoverGuess = guessArray.map((l, index) =>
        greenBackgrounds[index] !== theme.palette.success.main ? l : ""
      );

      // Handle assign yellow

      const allBackgrounds = greenBackgrounds.map((bg, index) => {
        if (bg !== theme.palette.success.main) {
          const hasLetter: boolean = leftoverSecret.includes(
            leftoverGuess[index]
          );
          if (hasLetter) {
            leftoverSecret.splice(
              leftoverSecret.indexOf(leftoverGuess[index]),
              1,
              ""
            );
            leftoverGuess.splice(index, 1, "");
          }
          return hasLetter
            ? theme.palette.warning.main
            : theme.palette.grey[800];
        } else {
          return bg;
        }
      });

      setLetterBackgroundColors(allBackgrounds);
    }
  }, [props.guess]);

  return (
    <Box
      component="form"
      id={`form-${props.guessIndex}`}
      onSubmit={handleSubmit}
    >
      <Stack
        gap={1}
        direction="row"
        sx={{ display: "flex", justifyContent: "normal", width: "100%" }}
      >
        {props.guess.map((val, index) => (
          <TextField
            key={index}
            inputProps={{
              maxLength: 1,
              type: "text",
              value: props.guess[index].toUpperCase(),
              disabled: true,
            }}
            sx={{
              backgroundColor:
                props.isDisabled && val !== ""
                  ? letterBackgroundColors[index]
                  : "inherit",
              "& input": {
                padding: "0",
                [theme.breakpoints.up("md")]: {
                  width: "68px",
                  height: "73px",
                  fontSize: "40px",
                },
                [theme.breakpoints.up("sm")]: {
                  width: "58px",
                  height: "63px",
                  fontSize: "35px",
                },
                [theme.breakpoints.up("xs")]: {
                  width: "43px",
                  height: "48px",
                  fontSize: "25px",
                },
                textAlign: "center",
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};
export default GameRow;
