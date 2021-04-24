import styled from "styled-components";

export const FormContainer = styled.div`
  width: 70%;
  /* height: 70%; */
  margin: ${({ reduceMargin }) => (reduceMargin ? "10px auto" : "80px auto")};
  padding: 1.5rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  background: #fff;
  display: flex;
  align-items: center;
  flex-direction: row;
  border-radius: 25px;

  @media screen and (max-width: 760px) {
    /* height: 85%; */
    width: 85%;
    flex-direction: column;
  }

  @media screen and (max-width: 460px) {
    width: 90%;
    background: #fff;
  }
`;
