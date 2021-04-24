import styled from "styled-components";

export const ScreenP = styled.p`
  margin: 5px auto;
  padding: 0 20px;
  font-size: 1.5rem;
  text-align: justify;
  color: #01579b;

  @media screen and (max-width: 760px) {
    font-size: 1rem;
  }

  @media screen and (max-width: 460px) {
    font-size: 0.9rem;
  }
`;
