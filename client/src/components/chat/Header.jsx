import React from 'react';
import { Typography, Avatar, Button, Paper } from '@mui/material';

const Header = ({ user, logout }) => {
  return (
    <Paper style={{
      padding: "20px",
      margin: "0 10px", // Adjusted margin to maintain distance from screen borders
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.4)", // Slightly darker background color
      backdropFilter: "blur(10px)",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
      position: "fixed",
      top: 0,
      width: "calc(100vh - 20px)", // Adjusted width to account for margin on both sides
      zIndex: 999,
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={user?.profile} alt="User Profile" sx={{ width: 50, height: 50, marginRight: '10px' }} />
        <Typography variant="h5" sx={{ color: "white" }}>{user?.username}</Typography>
      </div>
      <Button variant="contained" onClick={() => logout(user?.user_id)}>Logout</Button>
    </Paper>
  );
};

export default Header;
