import { Button, Container, Modal, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import GameRow from "./GameRow";
import GameKeyboard from "./GameKeyboard";
import { WordService } from "../services/WordService";
import { DictionaryService } from "../services/DictionaryService";

const GameContent = () => {
  const [guessIndex, setGuessIndex] = useState(0);
  const [guesses, setGuesses] = useState<string[][]>(
    Array(6).fill(Array(5).fill(""))
  );
  const [secretWord, setSecretWord] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const effectRan = useRef(false);
  const [isNotWord, setIsNotWord] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (!effectRan.current) {
      WordService.getRandomWord().then((response) => {
        if (response) {
          setSecretWord(response[0]);
        }
      });
      effectRan.current = true;
    }
  }, []);

  useEffect(() => {
    if (currentIndex === 5) {
      DictionaryService.getDefinition(guesses[guessIndex].join("")).then(
        (response) => {
          if (response === undefined) {
            setIsNotWord(true);
          }
        }
      );
    }
  }, [currentIndex]);

  const handleKeyPress = (event: React.KeyboardEvent | string) => {
    setIsNotWord(false);
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

  const handleSubmitGuess = (guess: string) => {
    if (guess.toUpperCase() === secretWord.toUpperCase()) {
      setIsGameOver(true);
      setModalOpen(true);
    }
    if (guess.length === secretWord.length) {
      setGuessIndex(guessIndex + 1);
      setCurrentIndex(0);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
          padding: "30px",
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
        {!isGameOver ? (
          <Button
            disabled={secretWord.length === 0}
            variant="outlined"
            type="submit"
            form={`form-${guessIndex}`}
            sx={{ color: "black", borderColor: "black" }}
          >
            {secretWord.length === 0
              ? "Loading"
              : isNotWord
              ? "Not a Word"
              : "Submit"}
          </Button>
        ) : (
          <Button
            type="button"
            variant="outlined"
            onClick={() => window.location.reload()}
            sx={{ color: "black", borderColor: "black" }}
          >
            New Game
          </Button>
        )}
        <GameKeyboard
          onKeyPress={handleKeyPress}
          secretWord={secretWord}
          guesses={guesses}
          guessIndex={guessIndex}
        />
      </Stack>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "lightgray",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack
            gap={1}
            sx={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h2" component="h2">
              You Win!!
            </Typography>
            <Typography variant="h4" sx={{}}>
              Play again?
            </Typography>
            <Button
              type="button"
              variant="outlined"
              onClick={() => window.location.reload()}
              sx={{ color: "black", borderColor: "black" }}
            >
              New Game
            </Button>
          </Stack>
        </Container>
      </Modal>
    </Container>
  );
};

export default GameContent;
