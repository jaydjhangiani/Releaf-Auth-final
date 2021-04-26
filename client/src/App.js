import { BrowserRouter as Router, Switch } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import DashboardScreen from "./screens/DashboardScreen";
import MeditationScreen from "./screens/MeditationScreen";
import PodcastScreen from "./screens/PodcastScreen";
import ChatroomScreen from "./screens/ChatroomScreen";
import AuthContext from "./context/AuthContext";
import Routing from "./routing/Routing";
import { useContext, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navigation/Navbar";
import MobileMenu from "./components/navigation/MobileMenu";
import Footer from "./components/navigation/Footer";
import PodcastRoute from "./utils/PodcastRoute";
import Loading from "./components/Loading";

const App = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Router>
      {user ? (
        <Sidebar user={user} />
      ) : (
        <>
          <Navbar toggle={toggle} />
          <MobileMenu toggle={toggle} isOpen={isOpen} />
        </>
      )}
      <Switch>
        <PrivateRoute
          exact
          path="/user/dashboard"
          component={DashboardScreen}
        />
        <PrivateRoute
          exact
          path="/user/meditation"
          component={MeditationScreen}
        />
        <PrivateRoute
          exact
          path="/user/podcast/:id"
          component={PodcastScreen}
        />
        <PrivateRoute
          exact
          path="/user/podcast/:id/episode/:eid"
          component={PodcastRoute}
        />
        <PrivateRoute exact path="/user/chatroom" component={ChatroomScreen} />
        <PrivateRoute
          exact
          path="/user/chatroom/:id"
          component={ChatroomScreen}
        />
        <Routing />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
