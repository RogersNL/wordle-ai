import { Box, Button, Stack, TextField } from "@mui/material";
import { FC, useRef, useState } from "react";

interface GameRowProps {
  guessIndex: number;
  guess: string;
  isDisabled: boolean;
}
const GameRow: FC<GameRowProps> = (props) => {
  const [values, setValues] = useState<string[]>(Array(5).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, event: any) => {
    const { value } = event.target;
    if (value.length > 1) return;

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: any) => {
    if (event.key === "Backspace" && values[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newValues = [...values];
      newValues[index - 1] = "";
      setValues(newValues);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = values.join("");
    console.log("RESULT", result);
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
        {values.map((_, index) => (
          <TextField
            key={index}
            disabled={props.isDisabled}
            inputProps={{
              maxLength: 1,
              type: "text",
              value: values[index].toUpperCase(),
              onChange: (event) => {
                handleChange(index, event);
              },
              onKeyDown: (event) => {
                handleKeyDown(index, event);
              },
              ref: (el: HTMLInputElement | null) =>
                (inputRefs.current[index] = el),
              readOnly: index > 0 && values[index - 1] === "",
            }}
            sx={{
              "& input": {
                width: "50px",
                height: "50px",
                fontSize: "50px",
                textAlign: "center",
              },
            }}
          />
        ))}
        <Button
          variant="outlined"
          type="submit"
          onClick={handleSubmit}
          sx={{ display: "none" }}
        ></Button>
      </Stack>
    </Box>
  );
};
export default GameRow;
