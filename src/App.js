//import logo from "./logo.svg";
//import "./App.css";
import Home from "./component/Home";
import Register from "./component/Register";
import {Amplify} from 'aws-amplify';
import awsconfig from './aws-exports';
import {withAuthenticator} from '@aws-amplify/ui-react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
} from "react-router-dom";
Amplify.configure(awsconfig);

function App() {
  return (
      <Router>
        <Link exact to ="/Home">
          Home
        </Link>
        <NavLink exact to ="/Register">
          Register Covid 
        </NavLink>
        <Switch>
          <Route exact path ="/Home" component = {Home} />
          <Route exact path ="/Register" component = {Register} />
        </Switch>
      </Router>
  );
}

export default withAuthenticator(App);
