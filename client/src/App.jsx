import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import ProfileList from './components/ProfilePic'; // Import the component for the profile list page


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path={"/home"} element={<Home />} />
          <Route path={"/"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
          <Route path="/profile-list" component={ProfileList}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;