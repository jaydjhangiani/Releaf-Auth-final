import { useEffect, useState } from "react";
import contactImg from "../assets/img/contact.svg";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Textfield from "../components/form/Textfield";
import Select from "../components/form/Select";
import purposeData from "../assets/data/PurposeData.json";
import countryCode from "../assets/data/CountryCode.json";
import occupationData from "../assets/data/OccupationData.json";
import db from "../assets/firebase";
import firebase from "firebase";
import axios from "axios";
import { FormContainer } from "../components/form/Container";
import {
  ScreenContainer,
  ScreenRow,
  ScreenWrapper,
  ScreenColumn1,
  ScreenColumn2,
  ScreenHeading,
  SubTitle,
  ImgWrap,
  Img,
} from "../components/screen";
import { FormBtn } from "../components/form/Button";
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
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "",
  phone: "",
  occupation: "",
  company: "",
  message: "",
};

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
  occupation: Yup.string().required("Required."),
  company: Yup.string(),
  message: Yup.string(),
});

const ContactScreen = () => {
  const classes = useStyles();
  // window width
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

  const contactHandler = async (values) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const contactData = {
      email: values.email,
      firstName: values.firstName,
    };

    db.collection("contact")
      .add({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: `+${values.countryCode}${values.phone}`,
        occupation: values.occupation,
        companyName: values.company,
        purpose: values.purpose,
        message: values.message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });

    try {
      await axios.post(
        "http://localhost:5000/api/contact",
        contactData,
        config
      );
      toast.success(`Thanks! Email  has been sent to ${values.email}`);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <ScreenContainer lightBg={true}>
      <ScreenWrapper>
        <ScreenRow>
          <ScreenColumn1>
            <ScreenHeading lightText={false}>Contact Us</ScreenHeading>
            <SubTitle darkText={true}>
              Through Releaf, we wish to encourage the people around us to not
              neglect their mental health. We wish to put equal emphasis on
              mental and physical well-being as we believe one is just as
              important as the other in this tumultuous journey of life.
            </SubTitle>
            <SubTitle darkText={true}>
              Our main objective for Releaf is to make mental healthcare
              resources widely accessible. Our intention is to ensure that even
              an individual, locked up within their own room, and struggling
              with their thoughts, has access to mental health rebuilding
              resources such as a supportive community, mental healthcare
              related podcasts and immediate access to psychiatrists amongst
              other. Come join us on this journey!
            </SubTitle>
          </ScreenColumn1>
          <ScreenColumn2>
            <ImgWrap>
              <Img src={contactImg} alt="Get in touch!" />
            </ImgWrap>
          </ScreenColumn2>
        </ScreenRow>

        <FormContainer reduceMargin={true}>
          <FormWrapper>
            <Grid container>
              <Grid item xs={12}>
                <Container maxWidth="md">
                  <div className={classes.formWrapper}>
                    <Formik
                      initialValues={{ ...INITIAL_FORM_STATE }}
                      validationSchema={FORM_VALIDATION}
                      onSubmit={contactHandler}
                    >
                      <Form>
                        <Grid container spacing={2}>
                          <Grid item xs={windowDimensions.width < 760 ? 12 : 6}>
                            <Textfield
                              name="firstName"
                              label="First Name"
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={windowDimensions.width < 760 ? 12 : 6}>
                            <Textfield
                              name="lastName"
                              label="Last Name"
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
                          <Grid item xs={windowDimensions.width < 760 ? 12 : 3}>
                            <Select
                              name="countryCode"
                              label="Code"
                              required={true}
                              options={countryCode}
                            />
                          </Grid>
                          <Grid item xs={windowDimensions.width < 760 ? 12 : 9}>
                            <Textfield
                              name="phone"
                              label="Phone"
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={windowDimensions.width < 760 ? 12 : 6}>
                            <Select
                              name="occupation"
                              label="Occupation"
                              options={occupationData}
                              required={true}
                            />
                          </Grid>
                          <Grid item xs={windowDimensions.width < 760 ? 12 : 6}>
                            <Textfield name="company" label="Company Name" />
                          </Grid>
                          <Grid item xs={12}>
                            <Select
                              name="purpose"
                              label="Purpose"
                              options={purposeData}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Textfield
                              name="message"
                              label="Write to us!"
                              multiline={true}
                              rows={3}
                            />
                          </Grid>
                        </Grid>
                        <FormBtn type="submit">Submit</FormBtn>
                      </Form>
                    </Formik>
                  </div>
                </Container>
              </Grid>
            </Grid>
          </FormWrapper>
        </FormContainer>
      </ScreenWrapper>
    </ScreenContainer>
  );
};

export default ContactScreen;
