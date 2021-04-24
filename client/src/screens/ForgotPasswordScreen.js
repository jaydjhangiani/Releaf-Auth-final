import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import forgotPasswordImg from "../assets/img/forgotPassword.svg";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Textfield from "../components/form/Textfield";
import { ScreenContainer } from "../components/screen/Container";
import { FormContainer } from "../components/form/Container";
import { FormImg } from "../components/form/Image";
import { FormBtn } from "../components/form/Button";
import { FormH1 } from "../components/form/Heading";
import { FormP } from "../components/form/Paragraph";
import { FormWrapper } from "../components/form/Wrapper";

toast.configure();

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
  fieldWrapper: {
    marginBottom: "20px",
  },
}));

const INITIAL_FORM_STATE = {
  email: "",
};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Invalid Email.").required("Required."),
});

const ForgotPasswordScreen = () => {
  const classes = useStyles();

  const forgotPasswordHandler = async (values) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        values,
        config
      );
      toast.success(data.data);
      // setSuccess(data.data);
    } catch (error) {
      toast.error(error.response.data.error);
      // setError(error.response.data.error);
      // setEmail("");
      // setTimeout(() => {
      //   setError("");
      // }, 5000);
    }
  };

  return (
    <ScreenContainer>
      <FormContainer>
        <FormImg src={forgotPasswordImg} secondary={true} />
        <FormWrapper>
          <FormH1>Forgot Password</FormH1>
          <FormP>
            Please enter the email address you register your account with. We
            will send you reset password confirmation to this email.
          </FormP>
          <Grid container>
            <Grid item xs={12}>
              <Container maxWidth="md">
                <div className={classes.formWrapper}>
                  <Formik
                    initialValues={{ ...INITIAL_FORM_STATE }}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={forgotPasswordHandler}
                  >
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Textfield
                            name="email"
                            label="Email"
                            required={true}
                          />
                        </Grid>
                      </Grid>
                      <FormBtn type="submit">Send Email</FormBtn>
                    </Form>
                  </Formik>
                </div>
              </Container>
            </Grid>
          </Grid>
        </FormWrapper>
      </FormContainer>
    </ScreenContainer>
  );
};

export default ForgotPasswordScreen;

// const ForgotPasswordContainer = styled.div`
//   width: 100%;
//   margin: 100px auto;
//   padding: 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   @media screen and (max-width: 780px) {
//     margin-top: 30px;
//   }

//   @media screen and (max-width: 460px) {
//     margin-top: 30px;
//   }
// `;

// const ForgotPasswordFormContainer = styled.div`
//   width: 80%;
//   /* height: 70%; */
//   padding: 1.5rem;
//   box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
//   background: #fff;
//   display: flex;
//   align-items: center;
//   flex-direction: row;
//   border-radius: 25px;

//   @media screen and (max-width: 760px) {
//     /* height: 85%; */
//     flex-direction: column;
//   }

//   @media screen and (max-width: 460px) {
//     width: 90%;
//     background: #fff;
//   }
// `;

// const ForgotPasswordImg = styled.img`
//   width: 55%;
//   padding: 25px;

//   @media screen and (max-width: 760px) {
//     width: 100%;
//     margin-bottom: 10px;
//   }
// `;

// const ForgotPasswordForm = styled.div`
//   width: 100%;
// `;

// const ForgotPasswordH1 = styled.h1`
//   text-align: center;
//   color: #01579b;
//   margin-bottom: 10px;

//   @media screen and (max-width: 760px) {
//     font-size: 1.5rem;
//   }
// `;

// const ForgotPasswordP = styled.p`
//   margin: 5px auto;
//   padding: 0 20px;
//   font-size: 0.9rem;
//   text-align: justify;
//   color: #01579b;

//   @media screen and (max-width: 760px) {
//     font-size: 0.8rem;
//   }
// `;

// const ForgotScreenBtn = styled.button`
//   padding: 10px 20px;
//   cursor: pointer;
//   width: 100%;
//   font-size: 1rem;
//   border: none;
//   border-radius: 5px;
//   background-color: #36aff7;
//   color: #fff;
//   margin-bottom: 20px;

//   :hover {
//     opacity: 0.8;
//   }

//   @media screen and (max-width: 760px) {
//     margin-bottom: 10px;
//   }
// `;
