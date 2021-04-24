import { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components'
import AuthContext from '../context/AuthContext'

const LogoutBtn = () => {

    const {userLogout} =useContext(AuthContext)

    const history = useHistory();

    const handleLogout = () => {
        userLogout();
        history.push("/");
    }

    return (
        <Button onClick={handleLogout} >
            Log Out
        </Button>
    )
}

export default LogoutBtn

const Button = styled.button`
    border-radius: 50px;
    background: #14a7f3;
    white-space: nowrap;
    padding: 12px 30px;
    color: #fff;
    font-size: 16px;
    outline: none;
    cursor: pointer;
    display:flex;
    border: 1px solid white;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.2);
    &:hover{
        transition: all 0.2s ease-in-out;
        opacity: 0.8;
        background-color: white;
        border: 1px solid #14a7f3;
        color:#14a7f3;
    }
`