import { useParams } from "react-router-dom";
import UserRegister from "../components/register/UserRegister";

const RegisterScreen = () => {
  const { type } = useParams();
  return <div>{type === "user" ? <UserRegister /> : <h1>{type}</h1>}</div>;
};

export default RegisterScreen;
