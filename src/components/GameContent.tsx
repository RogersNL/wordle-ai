import { Button, Container, Modal, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import GameRow from "./GameRow";
import GameKeyboard from "./GameKeyboard";
import { WordService } from "../services/WordService";
import { DictionaryService } from "../services/DictionaryService";
import theme from "../theme";

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
      getNewWord();
      effectRan.current = true;
    }
  }, []);

  useEffect(() => {
    if (currentIndex === 5) {
      validateWord(guesses[guessIndex].join("")).then((response) => {
        if (response === undefined) {
          setIsNotWord(true);
        }
      });
    }
  }, [currentIndex]);

  const getNewWord = async (): Promise<void> => {
    let getWord = async (): Promise<string> =>
      WordService.getRandomWord().then((response) => {
        const word = response[0];

        const isValidWord = validateWord(word);
        const isNotPlural = word.endsWith("s")
          ? validateWord(word.substring(0, word.length - 1))
          : Promise.resolve(true);

        return Promise.allSettled([isValidWord, isNotPlural]).then(
          (results) => {
            const [isValidWordResult, isNotPluralResult] = results;
            if (
              isValidWordResult.status === "fulfilled" &&
              isValidWordResult.value &&
              (isNotPluralResult.status === undefined ||
                (isNotPluralResult.status === "fulfilled" &&
                  isNotPluralResult.value))
            ) {
              return word;
            } else {
              return Promise.resolve("");
            }
          }
        );
      });
    let counter = 0;
    while (counter < 3) {
      let result = await getWord();
      if (result) {
        setSecretWord(result);
        break;
      }
      counter++;
    }
  };

  const validateWord = (word: string): Promise<boolean> => {
    return DictionaryService.getDefinition(word);
  };

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
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.down("sm")]: {
          padding: "0",
        },
      }}
    >
      <Stack
        gap={1}
        sx={{
          paddingTop: "30px",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          [theme.breakpoints.down("sm")]: {
            paddingTop: "10px",
          },
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
            disabled={
              secretWord.length === 0 || currentIndex !== 5 || isNotWord
            }
            variant="outlined"
            type="submit"
            form={`form-${guessIndex}`}
            sx={{
              padding: "15px",
              fontSize: "1.3rem",
              [theme.breakpoints.down("sm")]: {
                padding: "10px 5px",
                fontSize: "0.9rem",
              },
            }}
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
            bgcolor: theme.palette.grey[900],
            color: theme.palette.primary.main,
            border: "2px solid",
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
              fontSize: "1.3rem",
            }}
          >
            <Typography variant="h2" component="h2">
              You Win!
            </Typography>
            <Typography variant="h4" sx={{}}>
              {`Winning Word: ${guesses[guessIndex - 1]
                ?.join("")
                ?.toUpperCase()}`}
            </Typography>
            <Typography variant="h4" sx={{}}>
              {`# Attempts: ${guessIndex}`}
            </Typography>
            <Button
              type="button"
              variant="outlined"
              onClick={() => window.location.reload()}
              sx={{
                padding: "15px",
                fontSize: "1.3rem",
                [theme.breakpoints.down("sm")]: {
                  padding: "10px 5px",
                  fontSize: "0.9rem",
                },
              }}
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
