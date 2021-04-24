import styled from "styled-components";

export const FormP = styled.p`
  margin: 5px auto;
  padding: 0 20px;
  font-size: 1rem;
  text-align: justify;

  color: #01579b;

  @media screen and (max-width: 760px) {
    text-align: ${({ center }) => (center ? "center" : "justify")};
    font-size: 0.8rem;
  }
`;
