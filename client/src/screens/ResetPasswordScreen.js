import resetPasswordImg from "../assets/img/resetPassword.svg";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Password from "../components/form/Password";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ScreenContainer } from "../components/screen/Container";
import { FormContainer } from "../components/form/Container";
import { FormImg } from "../components/form/Image";
import { FormBtn } from "../components/form/Button";
import { FormH1 } from "../components/form/Heading";
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
  password: "",
  confirmPassword: "",
};

const FORM_VALIDATION = Yup.object({
  password: Yup.string().required("Required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required."),
});

const ResetPasswordScreen = ({ match }) => {
  const history = useHistory();
  const classes = useStyles();

  const resetPasswordHandler = async (values) => {
    // e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (values.password !== values.confirmPassword) {
      // setTimeout(() => {
      //   setError("");
      // }, 5000);
      toast.error("Passwords don't match");
      // return setError("Passwords don't match");
    } else {
      try {
        const { data } = await axios.put(
          `http://localhost:5000/api/auth/reset-password/${match.params.resetToken}`,
          values.password,
          config
        );

        // console.log(data);
        toast.success(data.data);
        history.push("/login");
        // setSuccess(!success);
      } catch (error) {
        toast.error(error.response.data.error);
        // setError(error.response.data.error);
        setTimeout(() => {
          // setError("");
        }, 5000);
      }
    }
  };

  return (
    <ScreenContainer>
      <FormContainer>
        <FormImg src={resetPasswordImg} secondary={true} />
        <FormWrapper onSubmit={resetPasswordHandler}>
          <FormH1>Reset Password</FormH1>
          <Grid container>
            <Grid item xs={12}>
              <Container maxWidth="md">
                <div className={classes.formWrapper}>
                  <Formik
                    initialValues={{ ...INITIAL_FORM_STATE }}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={resetPasswordHandler}
                  >
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Password name="password" label="Password" />
                        </Grid>
                        <Grid item xs={12}>
                          <Password
                            name="confirmPassword"
                            label="Confirm Password"
                          />
                        </Grid>
                      </Grid>
                      <FormBtn type="submit">Reset Password</FormBtn>
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

export default ResetPasswordScreen;

// const ResetPasswordScreenContainer = styled.div`
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

// const ResetPasswordScreenFormContainer = styled.div`
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

// const ResetPasswordScreenImg = styled.img`
//   width: 55%;
//   padding: 25px;

//   @media screen and (max-width: 760px) {
//     width: 100%;
//     margin-bottom: 10px;
//   }
// `;

// const ResetPasswordScreenForm = styled.div`
//   width: 100%;
// `;

// const ResetPasswordH1 = styled.h1`
//   text-align: center;
//   color: #01579b;
//   margin-bottom: 10px;

//   @media screen and (max-width: 760px) {
//     font-size: 1.5rem;
//   }
// `;

// const ResetPasswordBtn = styled.button`
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
