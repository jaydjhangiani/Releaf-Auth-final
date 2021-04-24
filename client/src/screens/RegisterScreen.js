import { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { Link } from "react-router-dom";

const RegisterScreen = ({ history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const registerHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmpassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    } else {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            firstName,
            lastName,
            username,
            email,
            password,
          },
          config
        );

        // localStorage.setItem("authToken",data.token);
        setSuccess(data.data);
        // history.push("/")
      } catch (error) {
        // console.log(error.response.data.error)
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };

  return (
    <>
      <div className="register-screen">
        <form onSubmit={registerHandler} className="register-screen__form">
          <h3 className="register-screen__title">Regitser</h3>
          {error && <span className="error-message">{error}</span>}
          {success && <span className="success-message">{success}</span>}

          <div className="form-group">
            <label htmlFor="fname">First Name:</label>
            <input
              type="text"
              required
              id="fname"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lname">Last Name:</label>
            <input
              type="text"
              required
              id="lname"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              required
              id="username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              required
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              required
              id="password"
              autoComplete="true"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmpassword">Confirm Password:</label>
            <input
              type="password"
              required
              id="confirmpassword"
              autoComplete="true"
              placeholder="Confirm password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>

          <span className="register-screen__subtext">
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default RegisterScreen;
