import styled from "styled-components";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Avatar, IconButton } from "@material-ui/core";

import db from "../../assets/firebase";

import ChatroomSidebarChat from "./ChatroomSidebarChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const ChatroomSidebar = ({ isOpen, toggle }) => {
  const { user } = useContext(AuthContext);

  const userChatRef = db.collection("chats");
  const [chatSnapshot] = useCollection(userChatRef);
  // console.log(user)
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <SidebarHeader>
        <SidebarAvatar alt={user.username?.charAt(0)} src={user.username} />
        <div className="sidebar__input">{user.username}</div>

        <SidebarIcon variant="outlined">
          <ArrowBackIosIcon />
        </SidebarIcon>
      </SidebarHeader>
      <SidebarChats>
        {chatSnapshot?.docs.map((chat) => (
          <ChatroomSidebarChat
            key={chat.id}
            id={chat.id}
            chatName={chat.data().chatName}
            description={chat.data().description}
          />
        ))}
      </SidebarChats>
    </SidebarContainer>
  );
};

export default ChatroomSidebar;

const SidebarContainer = styled.div`
  flex: 0.35;
  height: 90vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-right: 1px solid lightgray;

  @media screen and (max-width: 768px) {
    flex: 1;
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  height: 50px;
  background-color: white;
  justify-content: space-around;
`;

const SidebarAvatar = styled(Avatar)`
  cursor: pointer;
  margin: 10px;
`;

const SidebarIcon = styled(IconButton)`
  display: none !important;

  @media screen and (max-width: 768px) {
    display: block !important ;
  }
`;

const SidebarChats = styled.div`
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;
