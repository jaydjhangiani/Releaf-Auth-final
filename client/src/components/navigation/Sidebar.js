import styled from 'styled-components'
import { useContext } from "react"
import AuthContext from '../../context/AuthContext'
import {FaTimes} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import LogoutBtn from '../LogoutBtn'


const Sidebar = ({toggle, isOpen}) => {

    const {user} = useContext(AuthContext);

    return (
        <>
            <SidebarContainer isOpen={isOpen} onClick={toggle}>
                <Icon onClick={toggle}>
                    <CloseIcon />
                </Icon>
                <SidebarWrapper>
                    <SidebarMenu>
                        <SidebarLink to="/" onClick={toggle}>Home</SidebarLink>
                        <SidebarLink to="/contact" onClick={toggle}>Contact</SidebarLink>
                        {
                            !user ? (
                                <>
                                    <SidebarLink to="/login" onClick={toggle}>Login</SidebarLink>
                                    <SidebarLink to="/register" onClick={toggle}>Register</SidebarLink>
                                </>
                            ):(
                                <SideBtnWrap>
                                    <LogoutBtn/>
                                </SideBtnWrap>
                            )
                        }
                    </SidebarMenu>
                </SidebarWrapper>
            </SidebarContainer>
        </>
    )
}

export default Sidebar

const SidebarContainer = styled.aside`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: whitesmoke;
    display: grid;
    align-items: center;
    top: 0;
    left:0;
    transition: 0.3s ease-in-out;
    opacity: ${({ isOpen }) => (isOpen ? '100%': '0')};
    top: ${({ isOpen}) => (isOpen ? '0' : '-100%')}; 
`
const CloseIcon = styled(FaTimes)`
    color: #14a7f3;
`

const Icon = styled.div`
    position: absolute;
    top:1.2rem;
    right:1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;
`

const SidebarWrapper = styled.div``;

const SidebarMenu = styled.ul`
    display: grid;
    grid-template-columns : 1fr;
    align-items: center;
    padding-left: 0px;
    grid-template-rows: repeat(4,80px);
    text-align: center;
    @media screen and (max-width:480px){
        grid-template-rows: repeat(4,60px)
    }
`

const SidebarLink = styled(Link)`
    display:flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 600;
    text-decoration: none;
    list-style: none;
    transition: 0.2s ease-in-out;
    text-decoration: none;
    color: #14a7f3;
    cursor: pointer;
    &:hover{
        color: #01579b;
        transition: 0.2s ease-in-out;
    }
`

const SideBtnWrap = styled.div`
    display: flex;
    justify-content: center
`