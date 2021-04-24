import { useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import loginImg from "../assets/img/login.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Textfield from "../components/form/Textfield";
import Password from "../components/form/Password";
import { ScreenContainer } from "../components/screen/Container";
import { FormContainer } from "../components/form/Container";
import { FormImg } from "../components/form/Image";
import { FormBtn } from "../components/form/Button";
import { FormSpan } from "../components/form/Span";
import { FormLink } from "../components/form/Link";
toast.configure();

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  fieldWrapper: {
    marginBottom: "12px",
  },
}));

const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Invalid Email.").required("Required."),
  password: Yup.string().required("Required."),
});

const LoginScreen = ({ history }) => {
  const classes = useStyles();

  const { getUserDetails } = useContext(AuthContext);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

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
      // console.log(data.token)
      localStorage.setItem("authToken", data.token);
      toast.success(`Welcome Back, ${values.email}!`);
      getUserDetails();
      history.push("/user/dashboard");
    } catch (error) {
      toast.error(error.response.data.error);
      // setError(error.response.data.error);
      // setTimeout(() => {
      //     setError("");
      // }, 5000);
    }
  };

  return (
    <>
      <ScreenContainer>
        <FormContainer>
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
                          <Textfield
                            name="email"
                            label="Email"
                            required={true}
                          />
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
    </>
  );
};

export default LoginScreen;

// const LoginScreenContainer = styled.div`
//   width: 100%;
//   margin: 100px auto;
//   padding: 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   @media screen and (max-width: 780px) {
//     margin-top: 20px;
//   }

//   @media screen and (max-width: 460px) {
//     margin-top: 20px;
//   }
// `;

// const LoginScreenFormContainer = styled.div`
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

// const LoginScreenImg = styled.img`
//   width: 60%;
//   padding: 15px;

//   @media screen and (max-width: 760px) {
//     width: 100%;
//     margin-bottom: 10px;
//   }
// `;

// const LoginScreenBtn = styled.button`
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
//`;

// const LoginScreenSpan = styled.span`
//   display: block;
//   margin-top: 30px;
//   text-align: center;
//   color: #48549e;

//   /* @media screen and (max-width: 760px){
//         margin-top: 30px;
//     } */
// `;

// const LoginRegBtn = styled.button`
//   padding: 10px 20px;
//   cursor: pointer;
//   width: 100%;
//   font-size: 1rem;
//   border: none;
//   background-color: #48549e;
//   border-radius: 5px;
//   color: #fff;
//   margin-top: 10px;

//   :hover {
//     opacity: 0.8;
//   }

//   @media screen and (max-width: 760px) {
//     margin-top: 20px;
//   }
// `;

// const LoginScreenLink = styled(Link)`
//   text-decoration: none;
//   color: #14a7f3;

//   @media screen and (max-width: 460px) {
//     font-size: 0.9rem;
//   }
// `;
