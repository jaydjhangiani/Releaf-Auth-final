//packages
import { Container, Grid } from "@material-ui/core";
//components
import { ScreenContainer } from "../components/screen/Container";
import { FormContainer } from "../components/form/Container";
import { FormImg } from "../components/form/Image";
import { FormWrapper } from "../components/form/Wrapper";
import registerImg from "../assets/img/register.svg";
import { FormH1 } from "../components/form/Heading";
import styled from "styled-components";
import { FormP } from "../components/form/Paragraph";

const RegisterTypeScreen = ({ history }) => {
  //if type is user redirect
  const userHandler = (e) => {
    e.preventDefault();
    history.push("/register/user");
  };

  //if type is doctor redirect
  const doctorHandler = (e) => {
    e.preventDefault();
    history.push("/register/doctor");
  };

  return (
    <ScreenContainer>
      <FormContainer>
        <FormImg src={registerImg} alt="Register" secondary={true} />
        <FormWrapper>
          <FormH1>Register</FormH1>
          <FormP center={true}>
            Take your first steps towards mental gratification by clicking the
            button below.
          </FormP>
          <Grid container>
            <Grid item xs={12}>
              <Container maxWidth="md">
                <FormInputBtn onClick={userHandler}>User</FormInputBtn>
                <FormInputBtn secondary={true} onClick={doctorHandler}>
                  Doctor
                </FormInputBtn>
              </Container>
            </Grid>
          </Grid>
        </FormWrapper>
      </FormContainer>
    </ScreenContainer>
  );
};

export default RegisterTypeScreen;

const FormInputBtn = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: ${({ secondary }) => (secondary ? "#48549e" : "#36aff7")};
  color: #fff;
  /* margin-bottom: 10px; */
  margin-top: ${({ noTopPadding }) => (noTopPadding ? "null" : "20px")};

  :hover {
    opacity: 0.8;
  }

  @media screen and (max-width: 760px) {
    margin-bottom: 10px;
  }
`;
