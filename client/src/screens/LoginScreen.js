import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
//packages
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
//assets
import AuthContext from "../context/AuthContext";
import loginImg from "../assets/img/login.png";
//components
import Textfield from "../components/form/Textfield";
import Password from "../components/form/Password";
import { ScreenContainer } from "../components/screen/Container";
import { FormContainer } from "../components/form/Container";
import { FormImg } from "../components/form/Image";
import { FormBtn } from "../components/form/Button";
import { FormSpan } from "../components/form/Span";
import { FormLink } from "../components/form/Link";
//toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

//UI styles
const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  fieldWrapper: {
    marginBottom: "12px",
  },
}));

//inital values
const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

//validation schema
const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Invalid Email.").required("Required."),
  password: Yup.string().required("Required."),
});

const LoginScreen = ({ history }) => {
  const classes = useStyles();
  const { getUserDetails } = useContext(AuthContext);

  //redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  // function to handle login
  const loginHandler = async (values) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        values,
        config
      );
      localStorage.setItem("authToken", data.token);
      toast.success(`Welcome Back, ${values.email}!`);
      getUserDetails();
      history.push("/user/dashboard");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <ScreenContainer>
      <FormContainer reduceMargin={true}>
        <FormImg src={loginImg} alt="Login to Releaf" />
        <Grid container>
          <Grid item xs={12}>
            <Container maxWidth="md">
              <div className={classes.formWrapper}>
                <Formik
                  initialValues={{ ...INITIAL_FORM_STATE }}
                  validationSchema={FORM_VALIDATION}
                  onSubmit={loginHandler}
                >
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Textfield name="email" label="Email" required={true} />
                      </Grid>

                      <Grid item xs={12}>
                        <Password name="password" label="Password" />
                      </Grid>
                    </Grid>
                    <FormBtn type="submit">Login</FormBtn>
                  </Form>
                </Formik>
                <FormLink to="/forgot-password">Forgot Password ?</FormLink>

                <FormSpan>Haven't registered yet? Sign Up!</FormSpan>

                <Link to="/register">
                  <FormBtn secondary={true}>Sign Up</FormBtn>
                </Link>
              </div>
            </Container>
          </Grid>
        </Grid>
      </FormContainer>
    </ScreenContainer>
  );
};

export default LoginScreen;
