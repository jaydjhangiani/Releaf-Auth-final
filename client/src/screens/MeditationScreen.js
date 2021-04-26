import React, { useEffect, useState } from "react";
import styled from "styled-components";
import meditationImg from "../assets/img/meditation.svg";
import db from "../assets/firebase";
import MeditationItem from "../components/meditation/MeditationItem";
import {
  ScreenContainer,
  ScreenRow,
  ScreenColumn1,
  ScreenColumn2,
  ScreenTextWrapper,
  ScreenHeading,
  SubTitle,
  ImgWrap,
  Img,
  ScreenWrapper,
} from "../components/screen";

const MeditationScreen = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    db.collection("podcasts").onSnapshot((snapshot) =>
      setItems(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);
  return (
    <ScreenContainer lightBg={true} reducePadding={true}>
      <ScreenWrapper>
        <ScreenRow imgStart={false}>
          <ScreenColumn1>
            <ScreenTextWrapper>
              {/* <ScreenTopLine>OUR VISION</ScreenTopLine> */}
              <ScreenHeading lightText={false}>
                Meditation & Mindfullnes Section
              </ScreenHeading>
              <SubTitle darkText={true}>
                Our main objective for Releaf is to make mental healthcare
                resources widely accessible.
              </SubTitle>
            </ScreenTextWrapper>
          </ScreenColumn1>
          <ScreenColumn2>
            <ImgWrap>
              <Img src={meditationImg} alt="Meditation & Mindfullnes Section" />
            </ImgWrap>
          </ScreenColumn2>
        </ScreenRow>
        <ItemWrapper>
          <ScreenHeading lightText={true}>Our Selection</ScreenHeading>
          {items.map((item) => (
            <MeditationItem key={item.id} props={item.data} />
          ))}
        </ItemWrapper>
      </ScreenWrapper>
    </ScreenContainer>
  );
};

export default MeditationScreen;

const ItemWrapper = styled.div`
  margin: 0 auto;
  margin-top: 30px;
  width: 90%;
  color: #010606;
`;
