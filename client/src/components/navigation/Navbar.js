import { FaBars } from "react-icons/fa";
import styled from "styled-components";
import releafLogo from "../../assets/img/releaf.jpg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import LogoutBtn from ".././LogoutBtn";

const Navbar = ({ toggle }) => {
  const { user } = useContext(AuthContext);

  return (
    <Nav>
      <NavLink to="/">
        <NavImg src={releafLogo} alt="Releaf" />
      </NavLink>
      <MobileIcon onClick={toggle}>
        <FaBars />
      </MobileIcon>
      <NavMenu>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        {!user ? (
          <>
            {console.log(user)}
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        ) : (
          <>
            <LogoutBtn />
          </>
        )}
      </NavMenu>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  /* background: #16B0FE; */
  background: #14a7f3;
  height: 100px;
  display: flex;
  justify-content: space-between;
  /* padding: 0.5rem calc((100vw - 1000px) / 2); */
  padding: 2rem;
  z-index: 10;

  @media screen and (max-width: 768px) {
    padding: 0rem;
    height: 80px;
  }
`;

const NavImg = styled.img`
  width: 70px;
  display: block;
  border-radius: 50%;
  margin-right: 100px;
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  margin-left: -120px;
  margin-right: 24px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  /* color: #14a7f3; */
  color: white;
  /* font-weight: 600; */
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  //margin-left: -50px;
  cursor: pointer;

  &:active {
    color: #01579b;
  }

  &:hover {
    color: #01579b;
    transition: 0.2s ease-in-out;
  }
`;

const MobileIcon = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
    color: #14a7f3;
    color: white;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 60%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;
