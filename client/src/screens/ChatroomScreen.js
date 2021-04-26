import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ChatroomSidebar from "../components/chatroom/ChatroomSidebar";
import Welcome from "../components/Welcome";
import ChatroomChat from "../components/chatroom/ChatroomChat";

const ChatroomScreen = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const { id } = useParams();

  return (
    <ChatroomContainer>
      <ChatroomSidebar isOpen={isOpen} toggle={toggle} />
      {id ? (
        <>
          <ChatroomChat isOpen={isOpen} toggle={toggle} />
        </>
      ) : (
        <Welcome isOpen={isOpen} toggle={toggle} />
      )}
    </ChatroomContainer>
  );
};

export default ChatroomScreen;

const ChatroomContainer = styled.div`
  display: flex;
`;
