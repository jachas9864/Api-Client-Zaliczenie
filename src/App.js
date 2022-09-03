import * as React from "react";
import { Routes, Route, useNavigate, Link, NavLink } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Subjects from "./Pages/Auth/Subjects";
import LogoutPage from "./Pages/Auth/LogoutPage";
import LoginPage from "./Pages/Guest/LoginPage";
import RegisterPage from "./Pages/Guest/RegisterPage";

function App() {

  const [user, setUser] = React.useState({});
  const navigate = useNavigate()

  const logoutUser = () => {
    setUser({});
    return navigate('/');
  }

  const loginUser = (props) => {
    const {email, password} = props
    setUser({...user, username: email, auth: true});
    return navigate('/');
  }

  const registerUser = (props) => {
    const {email, firstname, index, password, confirmPassword} = props
    return navigate('/login');
  }

  return (
    <div className="App">
      <h1>Aplikacja Kliencka</h1>

      {user.auth ? (
        <>
          <p>
            {user.username}
          </p>
          <Link to="/exams">Examiny</Link>
          <Link to="/logout">Logout</Link>
        </>
      ): (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subjects" element={<Subjects />} />
        <Route path="/login" element={<LoginPage login={loginUser} />} />
        <Route path="/register" element={<RegisterPage register={registerUser} />} />
        <Route path="/logout" element={<LogoutPage logout={logoutUser} />} />
      </Routes>
    </div>
  );
}

export default App;