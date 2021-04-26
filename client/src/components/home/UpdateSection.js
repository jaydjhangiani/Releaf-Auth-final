import survey from "../../assets/img/survey.svg";

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
  ScreenBtnWrap,
  ScreenButton,
  ScreenWrapper,
} from "../screen";

const UpdateSection = () => {
  return (
    <ScreenContainer lightBg={true}>
      <ScreenWrapper>
        <ScreenRow imgStart={false}>
          <ScreenColumn1>
            <ScreenTextWrapper>
              <ScreenTopLine>UPDATES</ScreenTopLine>
              <ScreenHeading lightText={false}>
                Online Mental Healthcare Delivery: Your Opinion.
              </ScreenHeading>
              <SubTitle darkText={true}>
                Through this survey, we want to know your opinion regarding an
                online mental healthcare delivery system. Do you think the
                various features included would be useful to you? Do you think a
                software system through which you could access Mental Healthcare
                resources, even from the confines of your own bedroom would be a
                productive idea? Let us know!
              </SubTitle>
              <ScreenBtnWrap>
                <ScreenButton
                  target="#"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSf1rPprTCjyhhhQchzykOehLdni6MNUbSomumKQ4i3LILQwKw/viewform"
                >
                  Survey Now!
                </ScreenButton>
              </ScreenBtnWrap>
            </ScreenTextWrapper>
          </ScreenColumn1>
          <ScreenColumn2>
            <ImgWrap>
              <Img
                src={survey}
                alt="Online Mental Healthcare Delivery: Your Opinion"
              />
            </ImgWrap>
          </ScreenColumn2>
        </ScreenRow>
      </ScreenWrapper>
    </ScreenContainer>
  );
};

export default UpdateSection;
