import styled from "styled-components";

export const FormImg = styled.img`
  width: ${({ secondary }) => (secondary ? "55%" : "60%")};
  padding: ${({ secondary }) => (secondary ? "25px" : `15px`)};

  @media screen and (max-width: 760px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;
