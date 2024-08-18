import { Button, Container, Stack } from "@mui/material";
import React, { useState } from "react";
import GameRow from "./GameRow";

const GameContent = () => {
  const [guessIndex, setGuessIndex] = useState(0);
  const [guesses, setGuesses] = useState<string[]>(Array(6).fill(""));

  const secretWord: string = "testy";

  const handleSubmitGuess = (guess: string) => {
    if (guess.length === secretWord.length) {
      const newGuesses = [...guesses];
      newGuesses.splice(guessIndex, 1, guess);
      setGuesses(newGuesses);
      setGuessIndex(guessIndex + 1);
    }
  };

  return (
    <Container
      sx={{
        height: "100%",
        backgroundColor: "lightgray",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        gap={2}
        sx={{
          padding: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {guesses.map((_, index, event) => (
          <GameRow
            key={index}
            guessIndex={index}
            guess={guesses[index]}
            handleSubmitGuess={handleSubmitGuess}
            secretWord={secretWord}
            isDisabled={index !== guessIndex}
          />
        ))}
        <Button variant="outlined" type="submit" form={`form-${guessIndex}`}>
          Submit
        </Button>
      </Stack>
    </Container>
  );
};

export default GameContent;
