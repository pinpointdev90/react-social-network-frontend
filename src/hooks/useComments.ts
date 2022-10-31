import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexts/authContext";
import {post, profile} from "../types/generic";
import {getPost} from "../services/postServices";
import {getProfile, getProfileLikes} from "../services/userServices";

export const useComments = (id: number) => {
    const {authState} = useContext(AuthContext)
    const [comments, setComments] = useState<post[]>([]);

    const fetchComments = async() => {
        const post = await getPost(id, {"auth-token": authState?.token});
        const likedPost = await getProfileLikes({"auth-token": authState?.token});
        const profile = await getProfile({"auth-token": authState?.token});
        (post.data.comment as post[]).map(e => {
            likedPost.data.find((z: post) => {
                if (z.id == e.id) {
                    e.isLiked = true
                }
            })
            if((profile.data as profile).id == e.profile.id){
                e.own = true
            }
        })

        setComments(post.data.comment)
    }

    useEffect(() => {
        fetchComments().then(e => null);
        return () => {
            setComments([])
        }
    }, [id])

    return {comments, fetchComments}
}