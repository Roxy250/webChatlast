import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Verification from "../components/Verification";
import ProfilePic from "../components/ProfilePic";
import yato from "../assets/yato.png";

export default function Registration() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    username: "",
    profile: "",
  });
  const [display, setDisplay] = useState(true);
  const [showProfile, setShowProfile] = useState(true);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);

  const handleChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/api/user/register", userInfo)
      .then(async (response) => {
        alert(response.data.message);
        if (response.data.success) {
          setDisplay(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setUserInfo({ email: "", password: "", username: "", profile: "" });
  };

  useEffect(() => {
    let timerId;
    if (!display) {
      timerId = setTimeout(() => {
        setDisplay(true);
      }, 2 * 60 * 1000); // 2 minutes in milliseconds
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [display]);

  const toggleAvatarOptions = () => {
    setShowAvatarOptions(!showAvatarOptions);
    setShowProfile(false); // Hide the registration form when avatar options are shown
  };

  const handleBackToRegistration = () => {
    setShowProfile(true);
    setShowAvatarOptions(false);
  };

  const handleApply = () => {
    // Implement functionality to apply selected profile picture
  };

  return (
    <>
      {showProfile ? (
        display ? (
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
              alignItems: "center",
            }}
          >
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
                  textAlign: "center",
                }}
              >
                <b>Register</b>
              </h3>
              <div style={{ marginBottom: "8px", textAlign: "center" }}>
                {/* Modify the button as an image tag */}
                <img
                  src={userInfo.profile || yato}
                  // Provide a default image source
                  alt="Profile"
                  style={{
                    height: "50px",
                    width: "50px",
                    borderRadius: "50%", // Make it round
                    marginRight: "10px",
                    objectFit: "cover", // Prevent stretching
                    cursor: "pointer",
                    margin: "0 auto", // Center horizontally
                  }}
                  onClick={toggleAvatarOptions}
                />
              </div>

              <div>
                <label>Email:</label>
                <input
                  type="text"
                  required
                  name="email"
                  onChange={handleChange}
                  style={{
                    display: "block",
                    autoComplete: "email",
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
              <div>
                <label>Username:</label>
                <input
                  type="text"
                  required
                  name="username"
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
              <div>
                <label>Password:</label>
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
                Sign Up
              </button>
              <div>
                <Link
                  to="/login"
                  style={{
                    color: "#ffffff",
                    display: "block",
                    textAlign: "center",
                    marginTop: "20px",
                    textDecoration: "none",
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </form>
          </div>
        ) : (
          <Verification />
        )
      ) : (
        <ProfilePic
          setUserInfo={setUserInfo}
          userInfo={userInfo}
          setShowProfile={setShowProfile}
          handleApply={handleApply}
          handleBackToRegistration={handleBackToRegistration}
        />
      )}
    </>
  );
}
