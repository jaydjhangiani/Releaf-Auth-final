import { Avatar } from "@material-ui/core";
import { forwardRef, useContext } from "react";
import styled from "styled-components";
import AuthContext from "../../context/AuthContext";

const ChatroomMessage = forwardRef(
  ({ id, contents: { timestamp, message, photo, username } }, ref) => {
    const { user } = useContext(AuthContext);

    return (
      <MessageContainer
        ref={ref}
        sender={user.username === username ? true : false}
      >
        <MessagePhoto
          src={photo}
          alt={user.username?.charAt(0)}
          sender={user.username === username ? true : false}
        />
        <p>{message}</p>
        <small>{new Date(timestamp?.toDate()).toLocaleString()}</small>
      </MessageContainer>
    );
  }
);

export default ChatroomMessage;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: fit-content;
  justify-content: space-between;
  margin: 15px;
  margin-left: ${({ sender }) => (sender ? "auto" : "none")};

  > p {
    background-color: ${({ sender }) => (sender ? "#3cabfa" : "#f3f3f5")};
    color: ${({ sender }) => (sender ? "white" : "black")};
    font-size: medium;
    padding: 15px;
    border-radius: 20px;
    margin: 10px;
    margin-right: auto;
  }

  > small {
    color: gray;
    position: absolute;
    font-size: 8px;
    bottom: -5px;
    right: 0;
  }
`;

const MessagePhoto = styled(Avatar)`
  order: ${({ sender }) => (sender ? 1 : 0)};
  margin: ${({ sender }) => (sender ? "15px" : null)};
`;
