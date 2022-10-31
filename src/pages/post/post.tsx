import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import PostCardMolecule from "../../components/molecules/postCard";
import {useParams, useHistory, useLocation} from 'react-router-dom';
import {usePost} from "../../hooks/usePost";
import LoadingAtom from "../../components/atoms/loading";
import styled from "@emotion/styled";
import {IoChevronBackCircle} from "react-icons/all";
import ButtomAtom from "../../components/atoms/button";
import {useComments} from "../../hooks/useComments";
import {fadeIn} from "../../styles/animations";
import MenuSidebarMolecule from "../../components/molecules/menuSidebar";

const Container = styled.div`
  display: grid;
  grid-template-columns: 23.375rem auto;
`

const PostPageContainer = styled.div`
  * {
    transition: .2s all;
  }

  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  animation: ${fadeIn} .3s ease-in-out;
  margin-top: 4.5rem;
  height: calc(100vh - 4.5rem);
  ::-webkit-scrollbar {
    width: 0;
  }
`

const CommentContainer = styled.div`
  width: calc(100% - 14rem);
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 7rem;
  
  @media(max-width: 970px){
    width: 100%;
    margin: 0;
  }
`

const PostPage = () => {
    const {id} = useParams<any>()
    const {post, fetchPost} = usePost(id);
    const {comments, fetchComments} = useComments(id)
    let location = useLocation();

    useEffect(() => {
        fetchPost().then(d => null);
    }, [location])

    return (
        <Container>
            <MenuSidebarMolecule/>
            <PostPageContainer>
                {!post ? <LoadingAtom/> :
                    <PostCardMolecule parent={post.post} main={post.post} fetchComments={fetchComments}
                                      message={post.message} id={(post.id as number)} profile={post.profile}
                                      isLiked={(post.isLiked as boolean)} own={(post.own as boolean)} single={true}
                    />}
                <CommentContainer>
                    {
                        comments.length > 0 && comments.sort((a, b) => new Date(a.createdAt as string) < new Date(b.createdAt as string) ? 1 : -1).map((e) => (
                            <PostCardMolecule parent={e.post} fetchComments={fetchComments} single key={e.id} message={e.message}
                                              id={(e.id as number)} profile={e.profile}
                                              isLiked={(e.isLiked as boolean)} own={(e.own as boolean)}/>
                        ))
                    }
                </CommentContainer>
            </PostPageContainer>
        </Container>
    );
};

export default PostPage;
