import React, {createContext, useState} from 'react';
import {Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import HomePage from "../pages/home";
import PostPage from "../pages/post/post";
import SearchPage from "../pages/Search";
import ProfilePage from "../pages/Profile";
import styled from "@emotion/styled";
import {AiOutlineMenu, ImMenu} from "react-icons/all";

const OtherRoutes = () => {

    return (
        <>
                <Switch>
                    <Route exact path="/post/:id" component={PostPage}/>
                    <Route exact path="/search" component={SearchPage}/>
                    <Route exact path="/home" component={HomePage}/>
                    <Route exact path="/:user" component={ProfilePage}/>
                    <Redirect to={"/home"}/>
                </Switch>
        </>
    );
};

export default OtherRoutes;
