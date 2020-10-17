import React from "react";
import LoginPage from "#Components/Login/Login.jsx";
import { Route } from "react-router-dom";

const LoginContainer = () => <Route path="/login" component={LoginPage} />;

export default LoginContainer;
