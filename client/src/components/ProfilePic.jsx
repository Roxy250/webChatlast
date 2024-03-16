import React, { useState } from "react";
import "./ProfilePic.css"; // Import CSS for styling
import { Typography } from "@mui/material";

const ProfilePic = ({ setUserInfo, userInfo, setShowProfile, handleBackToRegistration }) => {  
  const girlAvatarNumbers = [
    68, 72, 61, 70, 77, 90, 76, 89, 80, 99, 60, 64, 62, 85, 79, 55, 96, 100, 53,
    75, 63, 74, 91, 86, 98, 54, 51, 83, 95, 71, 94, 58, 92, 93, 81, 73, 67, 52,
    97, 66, 57, 84, 82, 88, 56, 87,
  ];

  const boyAvatarNumbers = [
    2, 46, 4, 48, 6, 18, 8, 25, 44, 29, 47, 41, 36, 19, 16, 21, 39, 13, 49, 24,
    35, 43, 23, 11, 27, 9, 22, 1, 20, 10, 33, 26, 38, 12, 5, 32, 34, 40, 17, 45,
    37, 42, 7, 14, 31, 28,
  ];

  const [selectedGender, setSelectedGender] = useState(null);

  const handleApply = (avatarUrl) => {
    setUserInfo({ ...userInfo, profile: avatarUrl });
    handleBackToRegistration(); // Hide the profile picture selection screen
  };

  return (
    <div className="profile-pic-container">
      <div className="gender-heading">
        <h1
          onClick={() => setSelectedGender("Male")}
          className={selectedGender === "Male" ? "selected-gender" : null}
        >
          Male
        </h1>
        <h1
          onClick={() => setSelectedGender("Female")}
          className={selectedGender === "Female" ? "selected-gender" : null}
        >
          Female
        </h1>
      </div>
      <div className="avatar-container">
        {selectedGender === "Female"
          ? girlAvatarNumbers.map((number) => (
              <div key={number} className="avatar-card">
                <img
                  src={`https://avatar.iran.liara.run/public/${number}`}
                  alt={`Girl Avatar ${number}`}
                  className="avatar-image"
                />
                <button
                  onClick={() =>
                    handleApply(
                      `https://avatar.iran.liara.run/public/${number}`
                    )
                  }
                  className="apply-button"
                >
                  Apply
                </button>
              </div>
            ))
          : boyAvatarNumbers.map((number) => (
              <div key={number} className="avatar-card">
                <img
                  src={`https://avatar.iran.liara.run/public/${number}`}
                  alt={`Boy Avatar ${number}`}
                  className="avatar-image"
                />
                <button
                  onClick={() =>
                    handleApply(
                      `https://avatar.iran.liara.run/public/${number}`
                    )
                  }
                  className="apply-button"
                >
                  Apply
                </button>
              </div>
            ))}
      </div>
      <Typography
        onClick={handleBackToRegistration}
        sx={{
          color: "blue",
          "&:hover": { color: "purple" },
          cursor: "pointer",
        }}
      >
        Back to registration
      </Typography>
    </div>
  );
};

export default ProfilePic;
