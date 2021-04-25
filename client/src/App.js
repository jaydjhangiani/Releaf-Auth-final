import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import DashboardScreen from "./screens/DashboardScreen";
import { AuthContextProvider } from "./context/AuthContext";

import Routing from "./components/Routing";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <PrivateRoute
            exact
            path="/user/dashboard"
            component={DashboardScreen}
          />
          <Routing />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
