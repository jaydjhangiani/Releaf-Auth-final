import styled from "styled-components";

export const ScreenContainer = styled.div`
  width: 100%;
  margin: ${({ reduceMargin }) => (reduceMargin ? "40px auto" : "80px auto")};
  padding: 20px;
  display: flex;
  flex-direction: ${({ col }) => (col ? "column" : "row")};
  justify-content: center;
  align-items: ${({ noCenterAlign }) => (noCenterAlign ? null : "center")};

  @media screen and (max-width: 780px) {
    margin-top: 20px;
  }

  @media screen and (max-width: 460px) {
    margin-top: 20px;
  }
`;
