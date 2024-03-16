import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignInSide() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/user/login", userInfo)
      .then(async (response) => {
        if (response.data.success) {
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.loggedInUser)
          );
          navigate("/home");
          alert(response.data.message);
        } else {
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
        backgroundImage: `url(https://source.unsplash.com/random?wallpapers)`,
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Added position relative
      }}
    >
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          height: "600px",
          width: "400px",
          backgroundColor: "rgba(255,255,255,0.13)",
          borderRadius: "10px",
          backdropFilter: "blur(20px)",
          border: "2px solid rgba(255,255,255,0.1)",
          boxShadow: "0 0 40px rgba(8,7,16,0.6)",
          padding: "50px 35px",
        }}
      >
        <h3
          style={{
            fontSize: "32px",
            fontWeight: "500",
            lineHeight: "42px",
            textAlign: "center", // Added margin bottom for spacing
          }}
        >
          Login
        </h3>
        <div style={{ marginBottom: "20px" }}>
          {" "}
          {/* Added marginBottom for spacing */}
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            required
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleChange}
            style={{
              display: "block",
              height: "40px",
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.07)",
              borderRadius: "3px",
              padding: "0 10px",
              marginTop: "8px",
              fontSize: "14px",
              fontWeight: "300",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          {" "}
          {/* Added marginBottom for spacing */}
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            required
            name="password"
            autoComplete="current-password"
            onChange={handleChange}
            style={{
              display: "block",
              height: "40px",
              width: "100%",
              backgroundColor: "rgba(255,255,255,0.07)",
              borderRadius: "3px",
              padding: "0 10px",
              marginTop: "8px",
              marginBottom: "16px",
              fontSize: "14px",
              fontWeight: "300",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            marginTop: "8px",
            width: "100%",
            backgroundColor: "#ffffff",
            color: "#080710",
            padding: "10px 0", // Reduced padding
            fontSize: "14px", // Reduced font size
            fontWeight: "600",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login In
        </button>
        <div>
          {/* <Link
            to="#"
            style={{
              color: "#ffffff",
              display: "block",
              textAlign: "center",
              marginTop: "20px",
              textDecoration: "none",
            }}
          >
            Forgot password?
          </Link> */}
        </div>
        <div>
          <Link
            to="/"
            style={{
              color: "#ffffff",
              display: "block",
              textAlign: "center",
              marginTop: "40px",
              textDecoration: "none",
            }}
          >
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
}
