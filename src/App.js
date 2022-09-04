import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Link, NavLink, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Subjects from "./Pages/Auth/Subjects";
import LogoutPage from "./Pages/Auth/LogoutPage";
import LoginPage from "./Pages/Guest/LoginPage";
import RegisterPage from "./Pages/Guest/RegisterPage";
import Api from "./Services/Api";

function PrivateRoute({ user, children }) {
  const location = useLocation();

  if(!user.auth) {
    return <Navigate to="/login" state={{ from: location }} />
  }
  return children;
}

function App() {

  const [user, setUser] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    const localStorageUser = localStorage.getItem('user');
    if(!localStorageUser) {
      return;
    }
    const localUser = JSON.parse(localStorageUser);
    setUser({username: localUser.username, auth: true})
  }, []);

  const logoutUser = () => {
    setUser({});
    localStorage.removeItem('user');
    return navigate('/');
  }

  const loginUser = (props) => {
    const {email, password} = props
    Api.loginAction(email, password);
    setUser({...user, username: email, auth: true});
    localStorage.setItem('user', JSON.stringify({username: email}));
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
            {user.username} <Link to="/logout">Logout</Link>
          </p> 
        </>
      ): (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        
        <Route element={<PrivateRoute user={user} />}>
          <Route path="/subjects" element={<Subjects />} />
        </Route>
        
        <Route path="/login" element={<LoginPage login={loginUser} user={user} />} />
        <Route path="/register" element={<RegisterPage register={registerUser} user={user} />} />
        <Route path="/logout" element={<LogoutPage logout={logoutUser} />} />
      </Routes>
    </div>
  );
}

export default App;