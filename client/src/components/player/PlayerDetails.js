import styled from "styled-components";

function PlayerDetails({ podcast }) {
  return (
    <EpDetails>
      <EpImgWrapper>
        <EpImg src={podcast.itunes.image} alt={podcast.title} />
      </EpImgWrapper>
      <EpTitle>{podcast.title}</EpTitle>
      <EpAuthor>{podcast.creator}</EpAuthor>
    </EpDetails>
  );
}

export default PlayerDetails;

const EpDetails = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const EpImgWrapper = styled.div`
  position: relative;
  width: fit-content;
  margin: 0 auto;
`;

const EpImg = styled.img`
  display: block;
  margin: 30px auto;
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.8),
    -6px -6px 12px rgba(255, 255, 255, 0.4);
`;

const EpTitle = styled.h1`
  color: #14a7f3;
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 10px;

  @media only screen and (max-width: 760px) {
    font-size: 20px;
  }
`;

const EpAuthor = styled.p`
  color: black;
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;

  @media only screen and (max-width: 760px) {
    font-size: 16px;
  }
`;
