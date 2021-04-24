import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import * as FiIcons from 'react-icons/fi'
import AuthContext from '../../context/AuthContext';
import { useContext } from 'react';

const SidebarMenu = ({isUser}) => {

    const history = useHistory();
    const {userLogout} =useContext(AuthContext)

    const handleLogout = () => {
        userLogout();
        history.push("/");
    }

    return (
        <>
        <SidebarLink isUser = {isUser} onClick={handleLogout}>
            <div>
                <FiIcons.FiLogOut/>
                <SidebarLabel>Logout</SidebarLabel>
            </div>
        </SidebarLink>
        </>
    )
}

export default SidebarMenu

const SidebarLink = styled.div`
    display: flex;
    color: #e1e9fc;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    list-style: none;
    text-decoration: none;
    height: 60px;
    font-size: 18px;
    &:hover{
        background: ${({isUser}) => (isUser ? '#039be5': '#263238 ' )} ;
        border-left: 4px solid #fefefe;
        cursor: pointer;
    }
`

const SidebarLabel = styled.span`
    margin-left: 16px;
`
