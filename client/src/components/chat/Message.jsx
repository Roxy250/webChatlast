import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { format } from "date-fns";

const Message = ({ sender, message, timeStamp, isCurrentUser }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const truncatedMessage = message.substring(0, 100); // Truncate message to first 100 characters

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      style={{
        marginBottom: "10px",
        marginLeft: "20px",
        marginRight: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <span
        style={{
          backgroundColor: isCurrentUser ? "lightblue" : "whitesmoke",
          padding: "10px",
          borderRadius: "5px",
          wordWrap: "break-word",
          alignSelf: isCurrentUser ? "flex-end" : "flex-start",
          maxWidth: "50%",
          marginLeft: isCurrentUser ? "auto" : "0",
          marginRight: isCurrentUser ? "0" : "auto",
        }}
      >
        <Typography variant="caption" sx={{ color: "blue" }}>
          {isCurrentUser ? "You" : sender}
        </Typography>
        <Typography>{isExpanded ? message : truncatedMessage}</Typography>
        {message.length > 100 && (
          <Button variant="text" size="small" onClick={toggleExpand}>
            {isExpanded ? "Read less" : "Read more"}
          </Button>
        )}
        <Typography variant="caption" sx={{ color: "blue" }}>
          {format(new Date(timeStamp), "hh:mm")}
        </Typography>
      </span>
    </div>
  );
};

export default Message;
