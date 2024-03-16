// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import io from 'socket.io-client';
// import { useNavigate } from 'react-router-dom';
// import { Container, Grid } from '@mui/material';
// import Header from '../components/chat/Header';
// import Sidebar from '../components/chat/Sidebar';
// import Mainbar from '../components/chat/Mainbar';
// import SendMessageForm from '../components/chat/SendMessageForm';

// const socket = io('http://localhost:3000');

// const Home = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [user, setUser] = useState(location.state);
//   const [users, setUsers] = useState([]);
//   // const [text, setText] = useState('');
//   const [fetch, setFetch] = useState(true);
//   const [msges, setMsges] = useState([]);
//   const messagesEndRef = useRef(null);

//   const logout = (userId) => {
//     axios.post('http://localhost:3000/api/user/logout', { user_id: userId })
//       .then(response => {
//         console.log(response.data.message);
//       })
//       .catch(error => {
//         console.error('Error occurred:', error);
//       });
//     setUsers(prevUsers => prevUsers.filter(u => u.user_id !== userId));
//     setUser(null);
//     navigate('/login');
//   }

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const send = (message) => {
//     if (user) {
//       console.log(message);
//       socket.emit('send_message', message, user.user_id, user.room_id, user.username);
//     } else {
//       console.error('User object is null or undefined');
//     }
//   }
  

//   useEffect(() => {
//     socket.emit('Join', user?.room_id, user?.username);
//     axios.post('http://localhost:3000/api/message/getmessage', { room_id: user?.room_id })
//       .then(response => {
//         setMsges(response.data.messages);
//         scrollToBottom(); // Scroll to bottom after messages are fetched
//       })
//       .catch(error => {
//         console.error('Error fetching messages:', error);
//       });
//   }, [fetch]);

//   useEffect(() => {
//     socket.on('receive_message', () => {
//       setFetch(prev => !prev);
//     });
//     return () => {
//       socket.off('receive_message');
//     }
//   }, []);

//   useEffect(() => {
//     axios
//       .post('http://localhost:3000/api/user/getall', { room_id: user?.room_id })
//       .then((response) => {
//         if (response.data.users) {
//           setUsers(response.data.users);
//         } else {
//           console.log(response.data.message);
//         }
//       });
//   }, [users]);

//   return (
//     <div style={{backgroundImage: 'url("https://source.unsplash.com/random?night")',
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//     }}>
//     <Container
//       maxWidth="xl"
//       style={{
//         width: '100vw',
//         height: '100vh',
//         overflow: 'hidden',
//       }}
//     >
//       <Grid container spacing={0} style={{ height: '100%' }}>
//         {/* Header */}
//         <Grid item xs={12}>
//           <Header user={user} logout={logout} />
//         </Grid>

//         {/* Sidebar - Users List */}
//         <Grid item xs={2}>
//           <Sidebar users={users} />
//         </Grid>

//         {/* Main Content - Messages List */}
//         <Mainbar msges={msges} user={user} messagesEndRef={messagesEndRef} />

//         {/* Send Message Form */}
//         <Grid item xs={12}>
//           <SendMessageForm send={send} />
//         </Grid>
//       </Grid>
//     </Container>
//     </div>
//   );
// };

// export default Home;



import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
import "./Home.css"; // Importing CSS for Messages component
import yato from  "../assets/yato.png";

const socket = io("http://localhost:3000");

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(location.state);
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [msges, setMsges] = useState([]);

  useEffect(() => {
    console.log("Location state:", location.state);
    setUser(location.state);
    console.log("User state:", user);
  }, [location.state]);

  const logout = (userId) => {
    console.log("Logging out user with ID:", userId);
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
    if (!user) {
      console.error("User is null");
    } else if (text.trim() === "") {
      console.error("Message is empty");
    } else {
      console.log("Sending message:", text);
      socket.emit("send_message", text, user.user_id, user.room_id);
      setText("");
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
        console.log("Fetched messages:", response.data.messages);
        setMsges(response.data.messages);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, [user]);

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
          console.log("Fetched users:", response.data.users);
          setUsers(response.data.users);
        } else {
          console.log(response.data.message);
        }
      });
  }, [user]);

  return (
    <div>
      <div className="container">
        <div className="header">
          <div>
            <h3>Room ~ {user?.room_id}</h3>
            <h3> Hello, {user?.username}</h3>
          </div>
          <img src={user?.profile || yato} alt="User Profile" />
          <button onClick={() => logout(user?.user_id)}>Logout</button>
        </div>
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

export default Home;
