import { Button, Container, Stack } from "@mui/material";
import React, { useRef, useState } from "react";
import GameRow from "./GameRow";

const GameContent = () => {
  const [guessIndex, setGuessIndex] = useState(0);
  const [guesses, setGuesses] = useState<string[]>(Array(6).fill(""));
  const numberOfGuesses: number = 6;

  return (
    <Container
      sx={{
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
          <GameRow key={index} guessIndex={index} guess={guesses[index]} />
        ))}
        <Button variant="outlined" type="submit" form={`form-${guessIndex}`}>
          Submit
        </Button>
      </Stack>
    </Container>
  );
};

export default GameContent;
