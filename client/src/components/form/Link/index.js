import { Link } from "react-router-dom";
import styled from "styled-components";

export const FormLink = styled(Link)`
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  color: #14a7f3;

  @media screen and (max-width: 460px) {
    font-size: 0.9rem;
  }
`;
