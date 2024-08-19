import { Button, Container, Stack } from "@mui/material";
import React, { useRef, useState } from "react";
import GameRow from "./GameRow";
import GameKeyboard from "./GameKeyboard";

const GameContent = () => {
  const [guessIndex, setGuessIndex] = useState(0);
  const [guesses, setGuesses] = useState<string[][]>(
    Array(6).fill(Array(5).fill(""))
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const secretWord: string = "testy";

  const handleKeyPress = (event: React.KeyboardEvent | string) => {
    const key = typeof event === "string" ? event : event.key;

    // Check if the key pressed is a valid single character
    if (
      /^[a-zA-Z0-9]$/.test(key) &&
      currentIndex < guesses[guessIndex].length
    ) {
      const newValues: string[] = [...guesses[guessIndex]];
      newValues[currentIndex] = key.toUpperCase();
      const newGuesses: string[][] = [...guesses];
      newGuesses.splice(guessIndex, 1, newValues);

      setGuesses(newGuesses);
      setCurrentIndex(currentIndex + 1);
    }

    // Handle backspace
    if (key === "Backspace" && currentIndex > 0) {
      const newValues: string[] = [...guesses[guessIndex]];
      newValues[currentIndex - 1] = "";
      const newGuesses: string[][] = [...guesses];
      newGuesses.splice(guessIndex, 1, newValues);

      setGuesses(newGuesses);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmitGuess = (guess: string[]) => {
    if (guess.length === secretWord.length) {
      setGuessIndex(guessIndex + 1);
      setCurrentIndex(0);
    }
  };

  return (
    <Container
      tabIndex={0}
      onKeyDown={handleKeyPress}
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
        <GameKeyboard
          onKeyPress={handleKeyPress}
          secretWord={secretWord}
          guesses={guesses}
          guessIndex={guessIndex}
        />
      </Stack>
    </Container>
  );
};

export default GameContent;
