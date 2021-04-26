import { Route } from "react-router-dom";
import ActivationScreen from "../screens/ActivationScreen";
import ContactScreen from "../screens/ContactScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RegisterTypeScreen from "../screens/RegisterTypeScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

const Routing = () => {
  return (
    <>
      <Route exact path="/" component={HomeScreen} />
      <Route exact path="/contact" component={ContactScreen} />
      <Route exact path="/login" component={LoginScreen} />
      <Route exact path="/register" component={RegisterTypeScreen} />
      <Route exact path="/register/:type" component={RegisterScreen} />
      <Route
        exact
        path="/activate-account/:activateToken"
        component={ActivationScreen}
      />
      <Route exact path="/forgot-password" component={ForgotPasswordScreen} />
      <Route
        exact
        path="/reset-password/:resetToken"
        component={ResetPasswordScreen}
      />
    </>
  );
};

export default Routing;
