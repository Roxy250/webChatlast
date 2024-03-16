import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Verification() {
  const [remainingTime, setRemainingTime] = useState(120);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = () => {
    axios
      .post(`http://localhost:3000/api/user/verify`, { otp })
      .then(async (response) => {
        if (response.data.success) {
          navigate("/login");
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const randomWallpaperUrl = () => {
    const wallpapers = [
      "https://source.unsplash.com/random?japan",
      // Add more wallpaper URLs here if needed
    ];
    const randomIndex = Math.floor(Math.random() * wallpapers.length);
    return wallpapers[randomIndex];
  };

  return (
    <div
      style={{
        backgroundImage: `url(${randomWallpaperUrl()})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          height: "400px",
          width: "400px",
          backgroundColor: "rgba(255,255,255,0.13)",
          borderRadius: "10px",
          backdropFilter: "blur(10px)",
          border: "2px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 40px rgba(8,7,16,0.6)",
          padding: "50px 35px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ margin: "0 0 20px 0", color: "#000" }}>
          Verify your E-mail
        </h1>

        <input
          type="text"
          required
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder={`Enter OTP (Time Remaining: ${remainingTime}s)`}
          style={{
            width: "100%",
            height: "40px",
            fontSize: "16px",
            padding: "0 10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "20px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#ffffff",
            color: "#080710",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
