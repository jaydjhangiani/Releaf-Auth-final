import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
//packages
import axios from "axios";
import { Form, Formik } from "formik";
import { Container, Grid, makeStyles } from "@material-ui/core";
import * as Yup from "yup";
//assets
import activationImg from "../assets/img/activation.svg";
import AuthContext from "../context/AuthContext";
//components
import { ScreenContainer } from "../components/screen/Container";
import { FormContainer } from "../components/form/Container";
import { FormImg } from "../components/form/Image";
import { FormBtn } from "../components/form/Button";
import { FormH1 } from "../components/form/Heading";
import { FormP } from "../components/form/Paragraph";
import { FormWrapper } from "../components/form/Wrapper";
import Textfield from "../components/form/Textfield";
import countryCode from "../assets/data/CountryCode.json";
import Select from "../components/form/Select";
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
  countryCode1: "",
  countryCode2: "",
  countryCode3: "",
  emergencyPhone1: "",
  emergencyPhone2: "",
  emergencyPhone3: "",
};

//validation schema
const FORM_VALIDATION = Yup.object().shape({
  countryCode1: Yup.string().required("Required."),
  emergencyPhone1: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone Number Is Not Valid."
    )
    .typeError("Please enter a valid phone number.")
    .required("Required."),
  emergencyPhone2: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone Number Is Not Valid."
    )
    .typeError("Please enter a valid phone number."),
  emergencyPhone3: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone Number Is Not Valid."
    )
    .typeError("Please enter a valid phone number."),
});

const ActivationScreen = ({ match }) => {
  const history = useHistory();
  const classes = useStyles();
  const { getUserDetails } = useContext(AuthContext);

  //getting width of the screen
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

  //function to handle activation
  const activationHandler = async (values) => {
    const emergencyContactNumbers = {
      emrgencyContactOne: `+${values.countryCode1}${values.emergencyPhone1}`,
      emrgencyContactTwo: !values.emergencyPhone2
        ? null
        : `+${values.countryCode2}${values.emergencyPhone2}`,
      emrgencyContactThree: !values.emergencyPhone3
        ? null
        : `+${values.countryCode3}${values.emergencyPhone3}`,
    };

    console.log(emergencyContactNumbers);

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/auth/activate/${match.params.activateToken}`,
        emergencyContactNumbers,
        config
      );

      localStorage.setItem("authToken", data.token);

      // console.log(data);
      toast.success("Welcome to Releaf");
      getUserDetails();
      history.push("/user/dashboard");
    } catch (error) {
      toast.error(error.response.data.error);
      // setError(error.response.data.error);
      // setTimeout(() => {
      //   setError("");
      // }, 5000);
    }
  };

  return (
    <ScreenContainer>
      <FormContainer reduceMargin={true} extraWidth={true}>
        <FormImg src={activationImg} alt="Activate Your Account!" />
        <FormWrapper>
          <FormH1 extraPadding={true} smallFont={true}>
            Activate Your Account
          </FormH1>
          <FormP center={true}>
            Take your first steps towards mental gratification by clicking the
            button below.
          </FormP>
          <Grid container>
            <Grid item xs={12}>
              <Container maxWidth="md">
                <div className={classes.formWrapper}>
                  <Formik
                    initialValues={{ ...INITIAL_FORM_STATE }}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={activationHandler}
                  >
                    <Form>
                      <Grid container spacing={2}>
                        <Grid item xs={windowDimensions.width < 760 ? 12 : 5}>
                          <Select
                            name="countryCode1"
                            label="Code"
                            required={true}
                            options={countryCode}
                          />
                        </Grid>
                        <Grid item xs={windowDimensions.width < 760 ? 12 : 7}>
                          <Textfield
                            name="emergencyPhone1"
                            label="Phone"
                            required={true}
                          />
                        </Grid>
                        <Grid item xs={windowDimensions.width < 760 ? 12 : 5}>
                          <Select
                            name="countryCode2"
                            label="Code"
                            options={countryCode}
                          />
                        </Grid>
                        <Grid item xs={windowDimensions.width < 760 ? 12 : 7}>
                          <Textfield name="emergencyPhone2" label="Phone" />
                        </Grid>
                        <Grid item xs={windowDimensions.width < 760 ? 12 : 5}>
                          <Select
                            name="countryCode3"
                            label="Code"
                            options={countryCode}
                          />
                        </Grid>
                        <Grid item xs={windowDimensions.width < 760 ? 12 : 7}>
                          <Textfield name="emergencyPhone3" label="Phone" />
                        </Grid>
                      </Grid>
                      <FormBtn type="submit">Activate</FormBtn>
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

export default ActivationScreen;
