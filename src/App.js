import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Orders from './components/Orders/Orders';
import Admin from './components/Admin/Admin';
import Deals from './components/Deals/Deals';
import Login from './components/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Review from './components/Review/Review';
import { createContext, useState } from 'react';
import CheakOut from './components/CheakOut/CheakOut';
import SignUpRegister from './components/SignUpRegister/SignUpRegister';
import CheakOutRegister from './components/CheakOutRegister/CheakOutRegister';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
     <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
           <Router>
            <Header></Header>
              <Switch>
                  <Route path="/home">
                    <Home></Home>
                  </Route>
                  <Route path="/orders">
                      <Orders></Orders>
                  </Route>
                  <PrivateRoute path="/admin">
                      <Admin></Admin>
                  </PrivateRoute>
                  <PrivateRoute path="/review">
                      <Review></Review>
                  </PrivateRoute>
                  <Route path="/deals">
                      <Deals></Deals>
                  </Route>
                  <Route path="/login">
                      <Login></Login>
                  </Route>
                  <Route path="/cheakOut">
                      <CheakOut></CheakOut>
                  </Route>
                  <Route path="/signUpRegister">
                      <SignUpRegister></SignUpRegister>
                  </Route>
                  <Route path="/cheakOutRegister">
                      <CheakOutRegister></CheakOutRegister>
                  </Route>
                  <Route exact path="/">
                    <Home></Home>
                  </Route>
                  <Route path="*">
                    <NotFound></NotFound>
                  </Route>
              </Switch>
          </Router>
     </UserContext.Provider>
  );
}

export default App;
