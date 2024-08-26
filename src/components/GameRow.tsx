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
        secretWordArray[index] === props.guess[index] ? "green" : ""
      );
      const leftoverSecret = secretWordArray.map((l, index) =>
        greenBackgrounds[index] !== "green" ? l : ""
      );
      const leftoverGuess = guessArray.map((l, index) =>
        greenBackgrounds[index] !== "green" ? l : ""
      );

      // Handle assign yellow

      const allBackgrounds = greenBackgrounds.map((bg, index) => {
        if (bg !== "green") {
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
          return hasLetter ? "yellow" : "darkgray";
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
        gap={2}
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
                [theme.breakpoints.up("md")]: {
                  width: "40px",
                  height: "40px",
                  fontSize: "40px",
                },
                [theme.breakpoints.up("sm")]: {
                  width: "30px",
                  height: "30px",
                  fontSize: "30px",
                },
                [theme.breakpoints.up("xs")]: {
                  width: "20px",
                  height: "20px",
                  fontSize: "20px",
                },
                textAlign: "center",
                "&:disabled": {
                  color: "black",
                  WebkitTextFillColor: "black",
                },
                "&:focused": { color: "black", borderColor: "black" },
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
};
export default GameRow;
