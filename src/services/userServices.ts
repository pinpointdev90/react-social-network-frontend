import {getRequest, postRequest} from "./baseRequest";

export const getProfile = async (headers: {}) => {
    return await getRequest("/profile/find-one", headers)
}

export const giveLike = async (postId: number, header: {}) => {
    return await postRequest(`/profile/${postId}`, {}, header)
}

export const getProfileLikes = async (header: {}) => {
    return await getRequest('/profile/user-likes', header)
}

export const getProfilesByNickname = async (nickname: string, header: {}) => {
    return await getRequest("/profile/find-nickname/" + nickname, header)
}

export const getProfileByNickname = async (nickname: string, header: {}) => {
    return await getRequest(`/profile/find-one-nickname/${nickname}`, header)
}

export const followProfile = async (userId: number, header: {}) => {
    return await postRequest(`/user/follow/${userId}`, {}, header)
}