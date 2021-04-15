import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginScreen from './components/screens/LoginScreen'
import RegisterScreen from './components/screens/RegisterScreen'
import ForgotPasswordScreen from './components/screens/ForgotPasswordScreen'
import ResetPasswordScreen from './components/screens/ResetPasswordScreen'
import PrivateRoute from './components/routing/PrivateRoute';
import PrivateScreen from './components/screens/PrivateScreen';
import ActivationScreen from './components/screens/ActivationScreen';
const App =() => {
  return (

      <Router>
        <div className="app">
          <Switch>
            <PrivateRoute exact path="/" component={PrivateScreen} />
            <Route exact path="/login" component={LoginScreen} />
            <Route exact path="/register" component={RegisterScreen} />
            <Route exact path="/activate-account/:activateToken" component={ActivationScreen} />
            <Route exact path="/forgot-password" component={ForgotPasswordScreen} />
            <Route exact path="/reset-password/:resetToken" component={ResetPasswordScreen} />
          </Switch>
        </div>
      </Router>

  );
}

export default App;
