import styled from "styled-components";

export const FormBtn = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: ${({ secondary }) => (secondary ? "#48549e" : "#36aff7")};
  color: #fff;
  margin-bottom: 20px;
  margin-top: ${({ noTopPadding }) => (noTopPadding ? "null" : "20px")};

  :hover {
    opacity: 0.8;
  }

  @media screen and (max-width: 760px) {
    margin-bottom: 10px;
  }
`;
