import { useEffect, useState } from "react";
import contactImg from "../assets/img/contact.png";
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
import { ScreenContainer } from "../components/screen/Container";
import { FormContainer } from "../components/form/Container";
import { FormBtn } from "../components/form/Button";
import { ScreenH1 } from "../components/screen/Heading";
import { FormWrapper } from "../components/form/Wrapper";
import { ScreenP } from "../components/screen/Paragraph";
import { ScreenImg } from "../components/screen/Image";
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

  const classes = useStyles();

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
    <ScreenContainer col={true} noCenterAlign={true} reduceMargin={true}>
      <ScreenH1>Contact Us</ScreenH1>
      <ScreenImg src={contactImg} alt="Get in touch!" />
      <ScreenP>
        Through Releaf, we wish to encourage the people around us to not neglect
        their mental health. We wish to put equal emphasis on mental and
        physical well-being as we believe one is just as important as the other
        in this tumultuous journey of life.
      </ScreenP>
      <ScreenP>
        Our main objective for Releaf is to make mental healthcare resources
        widely accessible. Our intention is to ensure that even an individual,
        locked up within their own room, and struggling with their thoughts, has
        access to mental health rebuilding resources such as a supportive
        community, mental healthcare related podcasts and immediate access to
        psychiatrists amongst other. Come join us on this journey!
      </ScreenP>
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
    </ScreenContainer>
  );
};

export default ContactScreen;

// const ContactScreenContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 100%;
//   margin: 40px 0px;
//   padding: 20px;
//   justify-content: center;

//   @media screen and (max-width: 780px) {
//     margin: 20px 0px;
//     padding-top: 10px;
//   }

//   @media screen and (max-width: 460px) {
//     margin: 20px 0px;
//     padding-top: 0px;
//   }
// `;

// const ContactScreenH1 = styled.h1`
//   /* text-align: center; */
//   color: #01579b;
//   margin-bottom: 10px;
//   padding: 0 20px;
//   @media screen and (max-width: 760px) {
//     /* font-size: 1.5rem; */
//   }
// `;

// const ContactScreenP = styled.p`
//   margin: 5px auto;
//   padding: 0 20px;
//   font-size: 1.5rem;
//   text-align: justify;
//   color: #01579b;

//   @media screen and (max-width: 760px) {
//     font-size: 1rem;
//   }

//   @media screen and (max-width: 460px) {
//     font-size: 0.9rem;
//   }
// `;

// const ContactScreenImg = styled.img`
//   margin: 0 auto;
//   width: 80%;
//   padding: 25px;

//   @media screen and (max-width: 760px) {
//     margin-bottom: 10px;
//   }
// `;

// const ContactScreenFormContainer = styled.div`
//   width: 80%;
//   padding: 1.5rem;
//   margin: 10px auto;
//   margin-top: 30px;
//   box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
//   background: #fff;
//   display: flex;
//   align-items: center;
//   flex-direction: row;
//   border-radius: 25px;

//   @media screen and (max-width: 760px) {
//     width: 85%;
//     flex-direction: column;
//   }

//   @media screen and (max-width: 460px) {
//     width: 90%;
//     background: #fff;
//   }
// `;

// const ContactScreenForm = styled.div`
//   width: 100%;
// `;

// const ContactScreenBtn = styled.button`
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
