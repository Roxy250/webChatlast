import React from 'react';
import { Typography, Paper, Grid } from '@mui/material'; 
import Message from './Message';

const Mainbar = ({ msges, user, messagesEndRef }) => {
  return (
    <Grid item xs={10} style={{ marginTop: '100px' }}> {/* Adjust margin top to start below the header */}
      <Paper style={{ 
        height: 'calc(80vh - 100px)', // Subtract header height from viewport height
        overflowY: 'auto', 
        backgroundColor: 'rgba(255, 255, 255, 0.2)', 
        backdropFilter: 'blur(10px)', 
        border: '2px solid rgba(255, 255, 255, 0.1)', 
        boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)' 
      }}>
        {msges && msges.length > 0 ? (
          msges.map((msg, i) => (
            <Message
              key={i}
              sender={msg.sender}
              message={msg.message}
              timeStamp={msg.timeStamp}
              isCurrentUser={msg.sender === user.username}
            />
          ))
        ) : (
          <Typography style={{ color: "whitesmoke" }}>There is no message</Typography>
        )}
        <div ref={messagesEndRef} />
      </Paper>
    </Grid>
  );
};

export default Mainbar;
