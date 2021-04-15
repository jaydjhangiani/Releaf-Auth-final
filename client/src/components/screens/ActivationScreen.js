import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './style.css'

const ActivationScreen = ({match}) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const activationHandler = async (e) => {
        e.preventDefault();
    
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
    
        if (password !== confirmPassword) {
          setPassword("");
          setConfirmPassword("");
          setTimeout(() => {
            setError("");
          }, 5000);
          return setError("Passwords don't match");
        }else{
            try {
                const { data } = await axios.put(
                  `http://localhost:5000/api/auth/activate/${match.params.activateToken}`,
                  config
                );
          
                localStorage.setItem("authToken",data.token);
                console.log(data);
                setSuccess("Welcome to Releaf");
                
              } catch (error) {
                setError(error.response.data.error);
                setTimeout(() => {
                  setError("");
                }, 5000);
              }
        }
      };

    return (
        <div className="resetpassword-screen">
        <form
          onSubmit={activationHandler}
          className="resetpassword-screen__form"
        >
          <h3 className="resetpassword-screen__title">Activate Your Account</h3>
          {error && <span className="error-message">{error} </span>}
          {success && (
            <span className="success-message">
              {success} <Link to="/">Get Started</Link>
            </span>
          )}


          <button type="submit" className="btn btn-primary">
            Activate
          </button>
        </form>
      </div>
    )
}

export default ActivationScreen
