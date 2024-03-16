import React, { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";

const SendMessageForm = ({ send }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    send(text);
    setText("");
  };

  return (
    <Paper
      style={{
        padding: "2px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(10px)",
        border: "2px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message"
        onChange={(e) => setText(e.target.value)}
        value={text}
        sx={{ height: 50, marginRight: "10px" }}
      />
      <Button variant="contained" onClick={handleSend}>
        Send
      </Button>
    </Paper>
  );
};

export default SendMessageForm;
