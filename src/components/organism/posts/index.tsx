import React, {useContext, useState} from 'react';
import styled from "@emotion/styled";
import PostCreatorMolecule from "../../molecules/postCreator";
import PostCardMolecule from "../../molecules/postCard";
import {usePosts} from "../../../hooks/usePosts";
import LoadingAtom from "../../atoms/loading";
import {AuthContext} from "../../../contexts/authContext";
import {getProfile} from "../../../services/userServices";
import {profile} from "../../../types/generic";

const Posts = styled.div`
  overflow-y: scroll;
  margin: 0;
  width: 100%;

  ::-webkit-scrollbar {
    width: 0;
  }
`
const PostsOrganism = () => {
    const {posts, counter, fetchPosts, liked, loading, profile} = usePosts()
    const handleScroll = async (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const bottom = (e.target as Element).scrollHeight - ((e.target as Element).scrollTop) === (e.target as Element).clientHeight;
        if (bottom && counter >= 1){
            await fetchPosts()
        }
    }

    return (
        <Posts onScroll={handleScroll}>
            <PostCreatorMolecule fetchPosts={fetchPosts}/>
            { posts ? posts.sort((a,b) => new Date(a.createdAt as string) < new Date(b.createdAt as string) ? 1 : -1 ).map((e, i) => (
                <PostCardMolecule parent={e.post} key={e.id} message={e.message} id={e.id as number} profile={e.profile}
                                  isLiked={!!liked.find(z => z.id == e.id)}
                                  own={(profile as profile).id === e.profile.id} fetchPost={fetchPosts}/>
            )) : []}
            {loading && <LoadingAtom/>}
        </Posts>
    );
};

export default PostsOrganism;
