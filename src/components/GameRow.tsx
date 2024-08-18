import { Box, Button, Stack, TextField } from "@mui/material";
import { FC, useRef, useState } from "react";

interface GameRowProps {
  guessIndex: number;
  guess: string;
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
            inputProps={{
              maxLength: 1,
              type: "text",
              value: values[index],
              onChange: (event) => {
                handleChange(index, event);
              },
              ref: (el: HTMLInputElement | null) =>
                (inputRefs.current[index] = el),
            }}
            sx={{
              "& input": {
                width: "100px",
                height: "100px",
                fontSize: "100px",
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
