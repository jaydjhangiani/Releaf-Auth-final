import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
const MeditationItem = ({ props }) => {
  const history = useHistory();
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  // path
  const setPodcast = () => {
    history.push({
      pathname: `/user/podcast/${props.redirect}`,
      state: { props: props },
    });
  };

  // window width
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <PodcastContainer>
      <PodcastImg src={props.img} alt={props.title} />
      <PodcastTextWrapper>
        <h1>{props.title}</h1>
        <Author>{props.author}</Author>
        {windowDimensions.width < 760 ? (
          <p>{`${props.description}`.slice(0, 100) + " ..."}</p>
        ) : (
          <p>{`${props.description}`.slice(0, 130) + " ..."}</p>
        )}
        <BtnWrapper>
          <PodcastBtn onClick={setPodcast}>Listen Now!</PodcastBtn>
        </BtnWrapper>
      </PodcastTextWrapper>
    </PodcastContainer>
  );
};

export default MeditationItem;

const PodcastContainer = styled.div`
  display: flex;
  margin: 0 auto;
  height: 250px;
  margin-top: 15px;
  border: 3px dashed #fff;
  background-color: whitesmoke;

  align-items: center;
  padding: 15px;
  border-radius: 15px;

  @media screen and (max-width: 760px) {
    height: 200px;
  }

  @media screen and (max-width: 480px) {
    height: 100px;
  }
`;

const PodcastImg = styled.img`
  height: 100%;
  border-radius: 5px;
`;

const PodcastTextWrapper = styled.div`
  display: flex;
  padding: 0 20px;
  flex-direction: column;
  margin-left: 15px;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }

  > h1 {
    font-size: 1.6rem;
    margin-bottom: 5px;

    @media screen and (max-width: 1000px) {
      font-size: 1.3rem;
      margin-bottom: 4px;
    }

    @media screen and (max-width: 768px) {
      font-size: 1.2rem;
      margin-bottom: 4px;
    }

    @media screen and (max-width: 480px) {
      display: none;
    }
  }

  > p {
    text-align: justify;
    margin-bottom: 4px;
    font-size: 1.3rem;

    @media screen and (max-width: 1000px) {
      font-size: 1rem;
      margin-bottom: 2px;
    }

    @media screen and (max-width: 768px) {
      font-size: 1rem;
      margin-bottom: 2px;
    }
    @media screen and (max-width: 480px) {
      display: none;
    }
  }
`;

const Author = styled.h2`
  margin-bottom: 10px;
  font-size: 1rem;
  font-weight: 600;

  @media screen and (max-width: 760px) {
    font-size: 1rem;
    margin-bottom: 2px;
  }

  /* @media screen and (max-width:480px){
            font-size: 0.7rem;
            margin-top: 2px;
            margin-bottom: 0px;
        } */
`;

const BtnWrapper = styled.div`
  display: flex;
`;

const PodcastBtn = styled.button`
  margin-top: 15px;
  border-radius: 5px;
  /* background: #01bf71; */
  /* background: #e2adfc; */
  background: #afdfff;
  white-space: nowrap;
  padding: 10px 40px;
  color: #010606;
  font-size: 16px;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }

  @media screen and (max-width: 480px) {
    padding: 7px 20px;
  }
`;
