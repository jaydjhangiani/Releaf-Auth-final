import styled from "styled-components";
import homeImg from "../../assets/img/home.svg";

const HeroSection = () => {
  return (
    <HeroContainer id="home">
      <HeroBg>
        <ImgBg src={homeImg} alt="Welcome to Releaf" />
      </HeroBg>
      <HeroContent>
        <HeroH1>Welcome to Releaf</HeroH1>
        <HeroP>Take your first steps towards mental gratification</HeroP>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;

const HeroContainer = styled.div`
  background: #232a34;
  /* margin: 10px 10px; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 800px;
  position: relative;
  z-index: 1;

  :before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.6),
        100%
      )
      linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, transparent 100%);
    z-index: 2;
    /* border-radius: 30px; */
  }

  @media screen and (max-width: 760px) {
    height: 400px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ImgBg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroContent = styled.div`
  z-index: 3;
  max-width: 1200px;
  position: absolute;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeroH1 = styled.h1`
  color: #fff;
  font-size: 48px;
  text-align: center;
  font-style: italic;
  @media screen and (max-width: 760px) {
    font-size: 30px;
  }
  @media screen and (max-width: 480px) {
    font-size: 28px;
  }
`;

const HeroP = styled.p`
  margin-top: 24px;
  color: #fff;
  font-size: 24px;
  text-align: center;
  max-width: 600px;
  padding-left: 20px;
  @media screen and (max-width: 760px) {
    font-size: 24px;
  }
  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;
