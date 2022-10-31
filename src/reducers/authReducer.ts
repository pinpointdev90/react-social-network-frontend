import React from 'react';
import {authInitialState, profile} from "../types/generic";
import {authReducerTypes} from "../types/reducerTypes";

const AuthReducer = (state: authInitialState = {}, action: { type?: authReducerTypes, payload?: {token: string, profile: Promise<profile>} }): authInitialState => {
    console.log("pim pam pum")
    switch (action.type) {
        case "LOG_IN":
            return {token: action.payload?.token, profile: action.payload?.profile}
        case "LOG_OUT":
            return {token: undefined, profile: undefined}
        default:
            throw new Error("unknown action type");
    }
};

export default AuthReducer;
