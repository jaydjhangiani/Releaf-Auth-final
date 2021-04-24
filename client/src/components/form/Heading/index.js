import styled from "styled-components";

export const FormH1 = styled.h1`
  text-align: center;
  color: #01579b;
  margin-bottom: ${({ extraPadding }) => (extraPadding ? "20px" : "10px")};
  font-size: ${({ smallFont }) => (smallFont ? "1.8rem" : "2rem")};

  @media screen and (max-width: 760px) {
    font-size: 1.5rem;
  }
`;
