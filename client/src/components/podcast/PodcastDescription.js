import { Link } from "react-router-dom";
import styled from "styled-components";

const PodcastDescription = ({ podcast }) => {
  return (
    <>
      <PodcastImg src={podcast.img} />
      <PodcastTextWrapper>
        <PodcastTitle>{podcast.title}</PodcastTitle>
        <PodcastAuthor>{podcast.author}</PodcastAuthor>
        <PodcastDesc>{podcast.description}</PodcastDesc>
        <PodcastBtnWrapper>
          <a href={podcast.link}>
            <PodcastBtn>Visit on Anchor</PodcastBtn>
          </a>

          {podcast.support ? (
            <Link to={podcast.support}>
              <PodcastBtn>Support this podcast</PodcastBtn>
            </Link>
          ) : null}
        </PodcastBtnWrapper>
      </PodcastTextWrapper>
    </>
  );
};

export default PodcastDescription;

const PodcastImg = styled.img`
  margin-bottom: 25px;
  border-radius: 10px;
  height: 50vh;
  box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.2);

  @media screen and (max-width: 960px) {
    height: 100%;
    width: 50%;
  }
`;

const PodcastTextWrapper = styled.div`
  margin-left: 30px;

  @media screen and (max-width: 960px) {
    margin-left: 0px;
  }
`;

const PodcastTitle = styled.h1`
  margin-bottom: 15px;

  @media screen and (max-width: 960px) {
    text-align: center;
    font-size: 1.5rem;
  }
`;

const PodcastAuthor = styled.p`
  margin-bottom: 15px;

  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;

const PodcastDesc = styled.p`
  font-size: 1.2rem;
  /* height: 15vh; */
  padding: 5px 0;
  text-align: justify;
  margin-bottom: 15px;
  overflow-y: scroll;

  @media screen and (min-width: 1000px) {
    height: 15vh;
  }

  @media screen and (max-width: 100px) {
    font-size: 1.1rem;
  }

  @media screen and (max-width: 480px) {
    padding: 0px;
  }
`;

const PodcastBtnWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-content: center;
  /* border: 1px solid black; */
`;

const PodcastBtn = styled.button`
  border-radius: 30px;
  border: 1px solid #07589b;
  background-color: white;
  white-space: nowrap;
  padding: 20px 10px;
  color: #010606;
  font-size: 16px;
  outline: none;
  /* border:none; */
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    opacity: 0.7;
    color: #07589b;
  }

  @media screen and (max-width: 768px) {
    padding: 12px 10px;
  }

  @media screen and (max-width: 480px) {
    padding: 7px;
    font-size: 12px;
  }
`;
