import {getPosts} from "../services/postServices";
import {useCallback, useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexts/authContext";
import {post, profile} from "../types/generic";
import {getProfile, getProfileLikes} from "../services/userServices";

export const usePosts = (initalCounter: number = 0) => {
    const [posts, setPosts] = useState<post[]>([]);
    const [liked, setLiked] = useState<post[]>([]);
    const [counter, setCounter] = useState(initalCounter);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({});
    const {authState, authDispatch} = useContext(AuthContext);
    const [ableFetch, setAbleFetch] = useState(true);


    const fetchPosts = async () => {
        setLoading(true)
        if (ableFetch) {
            setAbleFetch(false)
            let header = {"auth-token": authState?.token}
            const posts = await getPosts(counter, header)
            const profileLikes = await getProfileLikes(header)
            const profile = await getProfile(header)
            if (posts.status === 403 || profileLikes.status === 403 || profile.status === 403) {
                authDispatch && authDispatch({type: "LOG_OUT"})
            }
            setPosts(posts.data)
            setLiked(profileLikes.data);
            setProfile(profile.data)
            setTimeout(() => {
                setAbleFetch(true)
            }, 200)
            setCounter(counter + 1)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchPosts().then(d => d)
        return () => {
            setPosts([])
            setLiked([])
        }
    }, [])


    return {
        posts,
        counter,
        fetchPosts,
        liked,
        loading,
        profile,
    }
}