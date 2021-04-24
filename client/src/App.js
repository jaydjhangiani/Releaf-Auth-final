import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import PrivateRoute from './routing/PrivateRoute';
import HomeScreen from "./screens/HomeScreen";
import { AuthContextProvider } from "./context/AuthContext";
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/navigation/Footer";
// import Routing from "./components/Routing";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Navbar />
        <Switch>
          {/* <PrivateRoute exact path="/user/dashboard" component={DashboardScreen} /> */}

          <Route exact path="/" component={HomeScreen} />

          {/* <Routing /> */}
        </Switch>
        <Footer />
      </Router>
    </AuthContextProvider>
  );
};

export default App;
