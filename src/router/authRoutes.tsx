import React from 'react';
import SignUpPage from "../pages/auth/SignUp";
import {Redirect, Route, Switch} from "react-router-dom";
import SignInFormMolecule from "../components/molecules/signInForm";
import SignInPage from "../pages/auth/signin";
import styled from "@emotion/styled";

const AuthRoutes = () => {

    const Nav = styled.nav`
      width: 100%;
      height: 6.625rem;
      box-shadow: 7px 7px 15px #bbcfda, -4px -4px 13px #fff,
      inset 4px 4px 8px rgba(209, 217, 230, 0.2),
        inset -8px -8px 8px rgba(255, 255, 255, 0.2);
      background-color: rgb(232, 239, 245);
      position: fixed;
      top: 0;
    `

    return (
        <>
            <Nav/>
            <Switch>
                <Route exact path="/auth/signup" component={SignUpPage}/>
                <Route exact path="/auth/signin" component={SignInPage}/>
                <Redirect to="/auth/signup"/>
            </Switch>
        </>
    );
};

export default AuthRoutes;
