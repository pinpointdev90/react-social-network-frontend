import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexts/authContext";
import {getPost} from "../services/postServices";
import {getProfile, getProfileLikes} from "../services/userServices";
import {post, profile} from "../types/generic";
import {useHistory} from "react-router-dom";

export const usePost = (id: number) => {
    let initialState: post = {id: 0, isLiked: false, message: "", own: false, profile: {id: 0, nickname: "", description: ""}}
    const [post, setPost] = useState<post>(initialState);
    const {authState} = useContext(AuthContext)
    let history = useHistory();

    const fetchPost = async () => {
        const foundPost = await getPost(id, {"auth-token": authState?.token}) as {data: post}
        const profileLikes = await getProfileLikes({"auth-token": authState?.token})
        const found = profileLikes.data.find((e: post) => (e.id == foundPost.data.id))
        foundPost.data.isLiked = !!found
        const profile = await getProfile({"auth-token": authState?.token})
        foundPost.data.own = (profile.data as profile).id == (foundPost.data as post).profile.id;
        setPost(foundPost.data)
    }

    useEffect(() => {
        fetchPost().then(d => null);
        return () => {
            setPost(initialState)
        }
    }, [history]);

    return {
        post,
        fetchPost
    }
}