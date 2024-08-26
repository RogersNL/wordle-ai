import { Box, Button, Stack, TextField } from "@mui/material";
import { FC } from "react";
import theme from "../theme";

interface GameRowProps {
  guessIndex: number;
  guess: string[];
  isDisabled: boolean;
  secretWord: string;
  handleSubmitGuess: Function;
}
const GameRow: FC<GameRowProps> = (props) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = props.guess.join("");
    console.log("RESULT", result);

    props.handleSubmitGuess(result);
  };

  const letterBackgroundColor = (letter: string, index: number): string => {
    if (
      props.secretWord.toUpperCase().includes(letter.toUpperCase()) &&
      props.secretWord.toUpperCase()[index] === letter.toUpperCase()
    ) {
      return "green";
    } else if (props.secretWord.toUpperCase().includes(letter.toUpperCase())) {
      return "yellow";
    } else {
      return "darkgray";
    }
  };

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
                  ? letterBackgroundColor(val, index)
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
