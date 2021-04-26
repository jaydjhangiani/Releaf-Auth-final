import Linkify from "react-linkify";
import parse from "html-react-parser";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";

const PodcastEpisode = ({ item, index, redirect }) => {
  const history = useHistory();
  let { id } = useParams();

  const handlePlayEpisode = (e) => {
    e.preventDefault();
    history.push({
      pathname: `/user/podcast/${id}/episode/${redirect}`,
      state: {
        currentSongIndex: index,
      },
    });
  };

  return (
    <Container>
      {index === 0 ? (
        <Latest>
          <h1>{item.title}</h1>
          <p>
            <strong>
              <i>Latest Episode</i>
            </strong>
          </p>
        </Latest>
      ) : (
        <h1>{item.title}</h1>
      )}
      <br />
      <Linkify>
        <div>{parse(item.content.slice(0, 230) + " ...")}</div>
      </Linkify>
      <br />
      <Btn onClick={handlePlayEpisode}>Play Episode</Btn>
    </Container>
  );
};

export default PodcastEpisode;

const Container = styled.div`
  border: 3px dotted #07589b;
  border-radius: 10px;
  padding: 15px;
  margin: 10px;
  word-wrap: break-word;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.2);

  > h1 {
    color: #07589b;
    font-size: 24px;

    @media screen and (max-width: 760px) {
      font-size: 1.2rem;
    }
  }

  > p {
    text-align: justify;
    font-size: 14px;
  }

  > div {
    @media screen and (max-width: 760px) {
      display: none;
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

const Latest = styled.span`
  > p {
    font-size: 14px;
    color: #14a7f3;
    margin-top: 5px;
  }
  > h1 {
    color: #07589b;
    font-size: 24px;

    @media screen and (max-width: 760px) {
      font-size: 1.2rem;
    }
  }
`;

const Btn = styled.button`
  border-radius: 5px;
  border: 1px solid #07589b;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.2);
  background-color: white;
  white-space: nowrap;
  padding: 10px 30px;
  color: #010606;
  font-size: 16px;
  outline: none;
  /* border:none; */
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    /* background: #192bc2; */
    color: #010606;
  }
`;
