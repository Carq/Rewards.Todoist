import { Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";

const Token = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    localStorage.setItem("AuthToken", value);
  };

  return (
    <Paper
      sx={{
        p: 2,
      }}
      elevation={1}
    >
      <Typography variant="h4">Token</Typography>
      <TextField
        sx={{
          mt: 2,
        }}
        fullWidth
        required
        value={inputValue}
        onChange={handleChange}
        type="password"
        label="Provide token"
      />
    </Paper>
  );
};

export default Token;
