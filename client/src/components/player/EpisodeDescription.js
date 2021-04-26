import Linkify from "react-linkify";
import parse from "html-react-parser";
import styled from "styled-components";

const EpisodeDescription = ({ ep }) => {
  // console.log(ep)
  return (
    <Container>
      <Linkify>
        <div>{parse(ep.replace(new RegExp("\r?\n", "g"), "<br/>"))}</div>
      </Linkify>
    </Container>
  );
};

export default EpisodeDescription;

const Container = styled.div`
  border: 3px solid #192bc2;
  margin: 0 auto;
  border-radius: 10px;
  padding: 15px;
  margin-top: 20px;
  width: 80%;
  align-items: center;
  word-wrap: break-word;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 760px) {
    width: 90%;
  }

  > h1 {
    color: #14aff3;
    font-size: 24px;

    @media screen and (max-width: 760px) {
      font-size: 1.2rem;
    }
  }

  > p {
    text-align: justify;
    font-size: 14px;

    @media screen and (max-width: 760px) {
      font-size: 12px;
    }
  }

  > a {
    text-decoration: none;
    color: #14a7f3;
  }

  > ul {
    margin-left: 5px;
  }
`;
