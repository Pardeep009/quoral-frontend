import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import './App.css';
import Navbar from './containers/Navbar/Navbar';
import Signin from './compnonents/Signin/Signin';
import Signup from './compnonents/Signup/Signup';
import Home from './compnonents/Home/Home';
import Invalid from './containers/Invalid';
import VerifyUser from './compnonents/VerifyUser/VerifyUser';
import ForgotPassword from './compnonents/ForgotPassword/ForgotPassword';
import ResetPassword from './compnonents/ResetPassword/ResetPassword';
import PrivateRoute from './auth/PrivateRoute';

function App() {
  return (
    <Router>
      <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
      />
      <Navbar />
      <Switch>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route path="/verify" component={VerifyUser} />
        <Route path="/reset-password" component={ResetPassword} />
        <PrivateRoute
          exact
          path="/"
          component={Home}
        />
        <Route path="*" component={Invalid} />
      </Switch>
    </Router>
  );
}

export default App;
