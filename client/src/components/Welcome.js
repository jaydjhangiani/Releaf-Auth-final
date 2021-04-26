import styled from "styled-components";
import chat from "../assets/img/chat.svg";
import chatroom from "../assets/img/chatroom.svg";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton } from "@material-ui/core";

const Welcome = ({ isOpen, toggle, type }) => {
  return (
    <div>
      <WelcomeContainer isOpen={isOpen}>
        <WelcomeHeader>
          <ShowSidebarButton>
            <IconButton>
              <ArrowBackIosIcon onClick={toggle} />
            </IconButton>
          </ShowSidebarButton>
          <h4>
            {type
              ? `Welcome To The Releaf Chat`
              : `Welcome To The Releaf Chatroom`}
          </h4>
        </WelcomeHeader>
        <WelcomeImg src={type ? chat : chatroom} />
      </WelcomeContainer>
    </div>
  );
};

export default Welcome;

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.65;
  height: 100vh;
  background-color: #e3eff6;

  @media screen and (max-width: 768px) {
    flex: 1;
    display: ${({ isOpen }) => (isOpen ? "none" : "flex")};
  }
`;

const WelcomeHeader = styled.div`
  padding: 20px;
  align-items: center;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid lightgray;
  background-color: #f5f5f5;
  height: 30px;
`;

const ShowSidebarButton = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const WelcomeImg = styled.img`
  width: 80%;
  margin: auto;
`;
