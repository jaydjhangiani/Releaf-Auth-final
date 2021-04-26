import infoOne from "../../assets/img/info-1.svg";
import {
  ScreenContainer,
  ScreenRow,
  ScreenColumn1,
  ScreenColumn2,
  ScreenTextWrapper,
  ScreenHeading,
  ScreenTopLine,
  SubTitle,
  ImgWrap,
  Img,
  ScreenWrapper,
} from "../screen";

const InfoSection = () => {
  return (
    <ScreenContainer lightBg={true}>
      <ScreenWrapper>
        <ScreenRow imgStart={false}>
          <ScreenColumn1>
            <ScreenTextWrapper>
              <ScreenTopLine>OUR VISION</ScreenTopLine>
              <ScreenHeading lightText={false}>
                Equal emphasis on mental and physical well-being.
              </ScreenHeading>
              <SubTitle darkText={true}>
                Our main objective for Releaf is to make mental healthcare
                resources widely accessible. Our intention is to ensure that
                even an individual, locked up within their own room, and
                struggling with their thoughts, has access to mental health
                rebuilding resources such as a supportive community, mental
                healthcare related podcasts and immediate access to
                psychiatrists amongst others. Come join us on this journey!
              </SubTitle>
            </ScreenTextWrapper>
          </ScreenColumn1>
          <ScreenColumn2>
            <ImgWrap>
              <Img
                src={infoOne}
                alt="Equal emphasis on mental and physical well-being."
              />
            </ImgWrap>
          </ScreenColumn2>
        </ScreenRow>
      </ScreenWrapper>
    </ScreenContainer>
  );
};

export default InfoSection;
