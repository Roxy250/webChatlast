import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import "./Messages.css"; // Importing CSS for Messages component

const socket = io("http://localhost:3000");

const Messages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(location.state);
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [msges, setMsges] = useState([]);

  const logout = (userId) => {
    axios
      .post("http://localhost:3000/api/user/logout", { user_id: userId })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
    setUser(null);
    navigate("/login");
  };

  const send = () => {
    if (user) {
      console.log(text);
      socket.emit("send_message", text, user.user_id, user.room_id);
      setText("");
    } else {
      // Handle the case where user is null
      console.error("User is null");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      send();
    }
  };

  useEffect(() => {
    socket.emit("Join", user?.room_id, user?.username);
    axios
      .post("http://localhost:3000/api/message/getmessage", {
        room_id: user?.room_id,
      })
      .then((response) => {
        setMsges(response.data.messages);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMsges((prevMsges) => [...prevMsges, data]);
    });
    return () => {
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/user/getall", { room_id: user?.room_id })
      .then((response) => {
        if (response.data.users) {
          setUsers(response.data.users);
        } else {
          console.log(response.data.message);
        }
      });
  }, [users]);

  return (
    <div>
      <div className="header">
        <div>
          <h3>Room ~ {user?.room_id}</h3>
          <h3> Hello, {user?.username}</h3>
        </div>
        <img src={user?.profile} alt="User Profile" />
        <button onClick={() => logout(user?.user_id)}>Logout</button>
      </div>
      <div className="container">
        <div className="user-list">
          <h3>Users</h3>
          {users &&
            users.map((obj, index) => (
              <div key={index + 1} className="user">
                <img src={obj.profile} alt={`User ${obj.username}`} />
                <p>{obj.username}</p>
              </div>
            ))}
        </div>
        <div className="message-container">
          {msges &&
            msges.map((msg, i) => (
              <div key={i++} className="message">
                <p>{msg.sender}</p>
                <div className="message-content">
                  <p>{msg.message}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="input-container">
        <input
          placeholder="Enter your message"
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          value={text}
        />
        <button onClick={send}>Send</button>
      </div>
    </div>
  );
};

export default Messages;
