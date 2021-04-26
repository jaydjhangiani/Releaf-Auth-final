import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import SidebarMenu from "./SidebarMenu";
import { IconContext } from "react-icons/lib";
import { useEffect, useState } from "react";
import { SidebarData } from "../../assets/data/SidebarData";
import SidebarMenuLogout from "./SidebarMenuLogout";

const Sidebar = ({ user }) => {
  const [sidebar, setSidebar] = useState(false);
  const [isUser, setIsUser] = useState(true);

  const showSiderbar = () => setSidebar(!sidebar);

  useEffect(() => {
    if (user) {
      if (user.typeOfUser !== "user") {
        console.log(user.typeOfUser);
        setIsUser(false);
      }
      console.log(isUser);
    }
  }, [isUser, user]);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav isUser={isUser}>
          <NavIcons to="#">
            <FaIcons.FaBars onClick={showSiderbar} />
          </NavIcons>
          <NavText>Welcome {user.username}</NavText>
        </Nav>
        <SidebarNav sidebar={sidebar} isUser={isUser}>
          <SidebarWrap>
            <NavIcons to="#">
              <AiIcons.AiOutlineClose onClick={showSiderbar} />
            </NavIcons>
            {SidebarData.map((item, index) => (
              <SidebarMenu
                item={item}
                key={index}
                isUser={isUser}
                showSiderbar={showSiderbar}
              />
            ))}
            <SidebarMenuLogout isUser={isUser} />
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;

const Nav = styled.div`
  background: ${({ isUser }) => (isUser ? "#01579b" : "#15171c")};
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavIcons = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media screen and (max-width: 760px) {
    font-size: 1.5rem;
  }
`;

const NavText = styled.h1`
  margin-right: 2rem;
  color: white;
  @media screen and (max-width: 760px) {
    font-size: 1.5rem;
  }
`;

const SidebarNav = styled.nav`
  background: ${({ isUser }) => (isUser ? "#01579b" : "#15171c")};
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;
