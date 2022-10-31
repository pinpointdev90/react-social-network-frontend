import {postRequest} from "./baseRequest";

export const signIn = async (body: {}) => {
    return await postRequest(`/user/signin`, body)
}
export const signUp = async (body: {}) => {
    return await postRequest(`/user/signup`, body)
}