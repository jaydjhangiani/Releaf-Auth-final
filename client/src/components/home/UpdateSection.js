import styled from "styled-components";
import survey from "../../assets/img/survey.svg";
const UpdateSection = () => {
  return (
    <InfoContainer lightBg={true}>
      <InfoWrapper>
        <InfoRow imgStart={true}>
          <Column1>
            <TextWrapper>
              <TopLine>UPDATES</TopLine>
              <Heading lightText={false}>
                Online Mental Healthcare Delivery: Your Opinion.
              </Heading>
              <SubTitle darkText={true}>
                Through this survey, we want to know your opinion regarding an
                online mental healthcare delivery system. Do you think the
                various features included would be useful to you? Do you think a
                software system through which you could access Mental Healthcare
                resources, even from the confines of your own bedroom would be a
                productive idea? Let us know!
              </SubTitle>
              <BtnWrap>
                <Button
                  target="#"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSf1rPprTCjyhhhQchzykOehLdni6MNUbSomumKQ4i3LILQwKw/viewform"
                >
                  Survey Now!
                </Button>
              </BtnWrap>
            </TextWrapper>
          </Column1>
          <Column2>
            <ImgWrap>
              <Img
                src={survey}
                alt="Online Mental Healthcare Delivery: Your Opinion"
              />
            </ImgWrap>
          </Column2>
        </InfoRow>
      </InfoWrapper>
    </InfoContainer>
  );
};

export default UpdateSection;

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

const Button = styled.a`
  text-decoration: none;
  border-radius: 50px;
  background: #37b0f7;
  white-space: nowrap;
  padding: ${({ big }) => (big ? "14px 48px" : "12px 30px")};
  color: ${({ dark }) => (dark ? "#010606" : "#fff")};
  font-size: ${({ fontBig }) => (fontBig ? "20px" : "16px")};
  outline: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #37b0f7;
    border: 1px solid #37b0f7;
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-start;
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
  color: ${({ lightText }) => (lightText ? "#37b0f7" : "#010606")};
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
