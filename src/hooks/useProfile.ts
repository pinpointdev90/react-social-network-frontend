import {useContext, useEffect, useState} from "react";
import {post, profile} from "../types/generic";
import {useParams} from "react-router-dom";
import {AuthContext} from "../contexts/authContext";
import {getProfileByNickname, getProfileLikes} from "../services/userServices";

const useProfile = () => {
    let profileInitialState = {
            description: "",
            id: 0,
            nickname: "",
            post: [],
            user: undefined,
            user_follow: []
        }
    const [profile, setProfile] = useState<profile>(profileInitialState);
    const [contextProfile, setContextProfile] = useState<profile>(profileInitialState);
    const [likedOnes, setLikedOnes] = useState<post[]>([]);
    const [loading, setLoading] = useState(true);
    const {user} = useParams<{ user: string }>();
    const {authState} = useContext(AuthContext);
    let headerUri = {"auth-token": authState?.token}

    const fetchProfile = async () => {
        const foundProfile = await getProfileByNickname(user, headerUri)
        setProfile(foundProfile.data)
        getProfileLikes(headerUri).then(d => {
            setLikedOnes(d.data)
        })
        setProfile(foundProfile.data)
        setLoading(false)
    }

    useEffect(() => {
        authState?.profile?.then(d => setContextProfile(d))
        fetchProfile().then(d => null)
        return () => {
            setProfile(profileInitialState)
        }
    }, [user])

    return {
        authStateProfile: contextProfile,
        loading,
        profile: profile as profile,
        fetchProfile,
        profilePosts: profile.post || [],
        likedOnes,
        contextProfile: contextProfile as profile
    }

}

export default useProfile