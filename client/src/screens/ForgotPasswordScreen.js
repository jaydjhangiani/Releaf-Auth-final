//assets
import forgotPasswordImg from "../assets/img/forgotPassword.svg";
//packages
import axios from "axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Grid, makeStyles } from "@material-ui/core";
//components
import Textfield from "../components/form/Textfield";
import { ScreenContainer } from "../components/screen";
import { FormContainer } from "../components/form/Container";
import { FormImg } from "../components/form/Image";
import { FormBtn } from "../components/form/Button";
import { FormH1 } from "../components/form/Heading";
import { FormP } from "../components/form/Paragraph";
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

//inital values
const INITIAL_FORM_STATE = {
  email: "",
};

//validation schema
const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Invalid Email.").required("Required."),
});

const ForgotPasswordScreen = () => {
  const classes = useStyles();

  //function to handle forgot password
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
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <ScreenContainer reducePadding={true} lightBg={true}>
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
