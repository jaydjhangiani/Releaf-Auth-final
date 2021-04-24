import { useHistory } from "react-router-dom";
import axios from "axios";
import { Form, Formik } from "formik";
import activationImg from "../assets/img/activation.svg";
import { Container, Grid, makeStyles } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const ActivationScreen = ({ match }) => {
  const history = useHistory();
  const classes = useStyles();

  const activationHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/auth/activate/${match.params.activateToken}`,
        config
      );

      localStorage.setItem("authToken", data.token);
      // console.log(data);
      toast.success("Welcome to Releaf");
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
      <FormContainer>
        <FormImg
          src={activationImg}
          alt="Activate Your Account!"
          secondary={true}
        />
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
                  <Formik onSubmit={activationHandler}>
                    <Form>
                      <FormBtn type="submit" noTopPadding={true}>
                        Activate
                      </FormBtn>
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

// const ActivationScreenContainer = styled.div`
//   width: 100%;
//   margin: 100px auto;
//   padding: 20px;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   @media screen and (max-width: 780px) {
//     margin-top: 40px;
//   }

//   @media screen and (max-width: 460px) {
//     margin-top: 40px;
//   }
// `;

// const ActivationScreenFormContainer = styled.div`
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

// const ActivationScreenImg = styled.img`
//   width: 55%;
//   padding: 25px;

//   @media screen and (max-width: 760px) {
//     width: 100%;
//     margin-bottom: 10px;
//   }
// `;

// const ActivationScreenForm = styled.div`
//   width: 100%;
// `;

// const ActivationScreenH1 = styled.h1`
//   text-align: center;
//   color: #01579b;
//   margin-bottom: 20px;

//   @media screen and (max-width: 760px) {
//     font-size: 1.5rem;
//   }
// `;

// const ActivationScreenP = styled.p`
//   padding: 0 20px;
//   font-size: 1rem;
//   text-align: justify;
//   color: #01579b;

//   @media screen and (max-width: 760px) {
//     font-size: 0.8rem;
//   }
// `;

// const ActivationScreenBtn = styled.button`
//   padding: 10px 20px;
//   cursor: pointer;
//   width: 100%;
//   font-size: 1rem;
//   border: none;
//   border-radius: 5px;
//   background-color: #36aff7;
//   color: #fff;
//   margin-top: 20px;
//   margin-bottom: 20px;

//   :hover {
//     opacity: 0.8;
//   }

//   @media screen and (max-width: 760px) {
//     margin-top: 0;
//     margin-bottom: 10px;
//   }
// `;
