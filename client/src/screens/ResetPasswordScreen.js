import { useHistory } from "react-router-dom";
//assets
import resetPasswordImg from "../assets/img/resetPassword.svg";
//packages
import axios from "axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Grid, makeStyles } from "@material-ui/core";
//components
import Password from "../components/form/Password";
import { ScreenContainer } from "../components/screen";
import { FormContainer } from "../components/form/Container";
import { FormImg } from "../components/form/Image";
import { FormBtn } from "../components/form/Button";
import { FormH1 } from "../components/form/Heading";
import { FormWrapper } from "../components/form/Wrapper";
//toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

//UI styles
const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
  fieldWrapper: {
    marginBottom: "20px",
  },
}));

//initial values
const INITIAL_FORM_STATE = {
  password: "",
  confirmPassword: "",
};

//validation schema
const FORM_VALIDATION = Yup.object({
  password: Yup.string().required("Required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required."),
});

const ResetPasswordScreen = ({ match }) => {
  const history = useHistory();
  const classes = useStyles();

  //function to handle reset password
  const resetPasswordHandler = async (values) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (values.password !== values.confirmPassword) {
      toast.error("Passwords don't match");
    } else {
      try {
        const { data } = await axios.put(
          `${process.env.REACT_APP_URI}/api/auth/reset-password/${match.params.resetToken}`,
          values.password,
          config
        );
        toast.success(data.data);
        history.push("/login");
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <ScreenContainer lightBg={true} reducePadding={true}>
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
