import styled from '@emotion/styled';
import React, {useContext, useEffect, useReducer, useState} from 'react'
import {
    BrowserRouter, Redirect, Route,
    Switch,
} from "react-router-dom";
import authReducer from "../reducers/authReducer";
import AuthRoutes from "./authRoutes";
import OtherRoutes from "./otherRoutes";
import {AuthContext} from "../contexts/authContext";
import {profile} from "../types/generic";
import {getProfile} from "../services/userServices";

const Router = () => {
    let init = () => {
        let token = localStorage.getItem("token");
        if (token) {
            const profile: Promise<profile> = getProfile({"auth-token": JSON.parse(token).token}).then(d => d.data)
            return {token: JSON.parse(token).token, profile};
        }
        return {token: undefined, profile: undefined};
    };

    const [authState, authDispatch] = useReducer(authReducer, {token: undefined, profile: undefined}, init);

    useEffect(() => {
        localStorage.setItem("token", JSON.stringify({token: authState.token}))
    }, [authState]);


    return (
        <BrowserRouter>
            <div style={{width: '100vw', height: '100vh', backgroundColor: 'rgb(232, 239, 245)'}}>
                    <AuthContext.Provider value={{authState, authDispatch}}>
                            {authState.token ? <OtherRoutes/> : <AuthRoutes/>}
                    </AuthContext.Provider>
            </div>
        </BrowserRouter>
    )
}

export default Router
