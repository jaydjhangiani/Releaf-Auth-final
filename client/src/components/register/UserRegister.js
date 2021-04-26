import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
//assets
import userRegisterImg from "../../assets/img/userRegister.svg";
import AuthContext from "../../context/AuthContext";
//packages
import axios from "axios";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Grid, makeStyles } from "@material-ui/core";
//components
import { ScreenContainer } from "../screen/";
import { FormContainer } from "../form/Container";
import { FormImg } from "../form/Image";
import { FormH1 } from "../form/Heading";
import { FormWrapper } from "../form/Wrapper";
import { FormSpan } from "../form/Span";
import { FormBtn } from "../form/Button";
import Textfield from "../form/Textfield";
import Password from "../form/Password";
import Checkbox from "../form/Checkbox";
import countryCode from "../../assets/data/CountryCode.json";
import Select from "../form/Select";
//toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

// #37B0F7
//UI styles
const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  fieldWrapper: {
    marginBottom: "12px",
  },
}));

//inital values
const INITIAL_FORM_STATE = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  countryCode: "",
  phone: "",
  password: "",
  confirmPassword: "",
  termsOfService: false,
};

//validation schema
const FORM_VALIDATION = Yup.object().shape({
  firstName: Yup.string().required("Required."),
  lastName: Yup.string().required("Required."),
  email: Yup.string().email("Invalid Email.").required("Required."),
  countryCode: Yup.string().required("Required."),
  phone: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone Number Is Not Valid."
    )
    .typeError("Please enter a valid phone number.")
    .required("Required."),
  password: Yup.string().required("Required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required."),
  termsOfService: Yup.boolean()
    .oneOf([true], "The terms and conditions must be accepted.")
    .required("The terms and conditions must be accepted."),
});

const UserRegister = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useContext(AuthContext);

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push(`/${user?.type}/dashboard`);
    }
  }, [history]);

  const registerHandler = async (values) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const formData = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      email: values.email,
      phoneNumber: `+${values.countryCode}${values.phone}`,
      password: values.password,
    };

    console.log(formData);

    if (values.password !== values.confirmPassword) {
      return toast.error("Passwords do not match");
    } else {
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_URI}/api/auth/register`,
          formData,
          config
        );

        toast.success(data.data);
      } catch (error) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <ScreenContainer lightBg={true}>
      <FormContainer
        onSubmit={registerHandler}
        extraWidth={true}
        reduceMargin={true}
      >
        <FormImg src={userRegisterImg} alt="Register!" />
        <FormWrapper>
          <FormH1>Regitser</FormH1>
          <Grid container>
            <Grid item xs={12}>
              <Container maxWidth="md">
                <div className={classes.formWrapper}>
                  <Formik
                    initialValues={{ ...INITIAL_FORM_STATE }}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={registerHandler}
                  >
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Textfield
                            name="firstName"
                            label="First Name"
                            required={true}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Textfield
                            name="lastName"
                            label="Last Name"
                            required={true}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Textfield
                            name="username"
                            label="Username"
                            required={true}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Textfield
                            name="email"
                            label="Email"
                            required={true}
                          />
                        </Grid>
                        <Grid item xs={windowDimensions.width < 760 ? 12 : 4}>
                          <Select
                            name="countryCode"
                            label="Code"
                            required={true}
                            options={countryCode}
                          />
                        </Grid>
                        <Grid item xs={windowDimensions.width < 760 ? 12 : 8}>
                          <Textfield
                            name="phone"
                            label="Phone"
                            required={true}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Password name="password" label="Password" />
                        </Grid>
                        <Grid item xs={12}>
                          <Password
                            name="confirmPassword"
                            label="Confirm Password"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Checkbox
                            name="termsOfService"
                            legend="Terms of Service"
                            label="I agree"
                          />
                        </Grid>
                      </Grid>
                      <FormBtn type="submit">Submit</FormBtn>
                    </Form>
                  </Formik>
                  <FormSpan>Already have an account?</FormSpan>
                  <Link to="/login">
                    <FormBtn secondary={true}>Login</FormBtn>
                  </Link>
                </div>
              </Container>
            </Grid>
          </Grid>
        </FormWrapper>
      </FormContainer>
    </ScreenContainer>
  );
};

export default UserRegister;
