import styled from "styled-components";
import infoOne from "../../assets/img/info-1.svg";

const InfoSection = () => {
  return (
    <InfoContainer lightBg={true}>
      <InfoWrapper>
        <InfoRow imgStart={false}>
          <Column1>
            <TextWrapper>
              <TopLine>OUR VISION</TopLine>
              <Heading lightText={false}>
                Equal emphasis on mental and physical well-being.
              </Heading>
              <SubTitle darkText={true}>
                Our main objective for Releaf is to make mental healthcare
                resources widely accessible. Our intention is to ensure that
                even an individual, locked up within their own room, and
                struggling with their thoughts, has access to mental health
                rebuilding resources such as a supportive community, mental
                healthcare related podcasts and immediate access to
                psychiatrists amongst other. Come join us on this journey!
              </SubTitle>
            </TextWrapper>
          </Column1>
          <Column2>
            <ImgWrap>
              <Img
                src={infoOne}
                alt="Equal emphasis on mental and physical well-being."
              />
            </ImgWrap>
          </Column2>
        </InfoRow>
      </InfoWrapper>
    </InfoContainer>
  );
};

export default InfoSection;

const InfoContainer = styled.div`
  color: #fff;
  background: ${({ lightBg }) => (lightBg ? "#f9f9f9" : "#010606")};
  @media screen and (max-width: 760px) {
    padding: 100px 0;
  }
`;

const InfoWrapper = styled.div`
  display: grid;
  z-index: 1;
  height: 850px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  justify-content: center;
`;

const InfoRow = styled.div`
  display: grid;
  grid-auto-columns: minmax(auto, 1fr);
  align-items: center;
  grid-template-areas: ${({ imgStart }) =>
    imgStart ? `'col2 col1'` : `'col1 col2'`};
  @media screen and (max-width: 760px) {
    grid-template-areas: ${({ imgStart }) =>
      imgStart ? `'col1' 'col2'` : `'col1 col1' 'col2 col2'`};
  }
`;

const Column1 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col1;
`;

const Column2 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col2;
`;

const TextWrapper = styled.div`
  max-width: 540px;
  padding-bottom: 60px;
  padding-top: 0;
`;

const TopLine = styled.p`
  color: #37b0f7;
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 16px;
`;
const Heading = styled.h1`
  margin-bottom: 24px;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 600;
  color: ${({ lightText }) => (lightText ? "#f7f8fa" : "#010606")};
  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

const SubTitle = styled.p`
  max-width: 440px;
  margin-bottom: 35px;
  font-size: 18px;
  line-height: 24px;
  text-align: justify;
  color: ${({ darkText }) => (darkText ? "#010606" : "#fff")};
`;

const ImgWrap = styled.div`
  max-width: 555px;
  height: 100%;
`;

const Img = styled.img`
  width: 100%;
  margin: 0 0 10px 0;
  padding-right: 0;
`;
