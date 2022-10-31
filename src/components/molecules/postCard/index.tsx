import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { CgProfile } from 'react-icons/cg';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { BiTrashAlt, FaRegCommentAlt } from 'react-icons/all';
import { post, profile } from '../../../types/generic';
import { fadeIn } from '../../../styles/animations';
import { giveLike } from '../../../services/userServices';
import { AuthContext } from '../../../contexts/authContext';
import ButtomAtom from '../../atoms/button';
import { deletePost } from '../../../services/postServices';
import { Link, useHistory, useLocation } from 'react-router-dom';
import CreateCommentAlert from '../../atoms/createCommentAlert';

interface PostCardProps {
  message: string;
  id: number;
  profile: profile;
  isLiked: boolean;
  own: boolean;
  fetchPost?: () => Promise<void>;
  single?: boolean;
  fetchComments?: () => Promise<void>;
  parent?: post;
  main?: post;
}

const PostCard = styled.div`
  display: grid;
  grid-template-columns: 5% 80% 5%;
  column-gap: 5%;
  padding: 2rem;
  position: relative;

  @media (max-width: 970px) {
    grid-template-columns: 8% 80% 8%;
    column-gap: 2%;
    padding: 1rem;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 5%;
    height: 1px;
    width: 90%;
    border-bottom: 1px solid #cccccc;
    margin-bottom: 0.5rem;
  }

  div {
    display: flex;
    justify-content: left;
    flex-direction: column;

    * {
      margin: 0;
      font-family: sans-serif;
      color: #333333;
    }

    p {
      white-space: pre-wrap;
      margin-top: 1rem;
      text-align: left;
      overflow-wrap: break-word;
      word-wrap: break-word;
      hyphens: auto;
      font-family: sans-serif;
    }

    h5 {
      font-size: 1.125rem;
      font-weight: bold;
    }
  }

  span {
    font-size: 2rem;
    display: flex;
    justify-content: center;
  }
`;
const Container = styled.div<{ single: boolean }>`
  margin: 2rem;
  width: ${({ single }) => (single ? 'calc(100% - 4rem)' : 'unset')};
  transition: 0.25s all;
  animation: ${fadeIn} 0.3s ease forwards;
  display: flex;
  flex-direction: column;
  height: auto;
  background-color: #e8eff5;
  box-shadow: 7px 7px 15px #bbcfda, -4px -4px 13px #fff,
    inset 4px 4px 8px rgba(209, 217, 230, 0.2),
    inset -8px -8px 8px rgba(255, 255, 255, 0.2);

  border-radius: 1rem;
  margin-bottom: ${({ single }) => (single ? '2rem' : '0')};
  margin-top: ${({ single }) => (single ? '0' : '2rem')};

  a {
    text-decoration: inherit;
    color: inherit;
  }

  &:hover {
    transform: translateY(0.5rem);
    box-shadow: 4px 2px 18px #bbcfda, -4px -4px 13px #fff,
      inset 6px 6px 16px rgba(209, 217, 230, 0.8),
      inset -8px -8px 8px rgba(255, 255, 255, 0.2);
  }
`;

const CardTools = styled.div`
  * {
    animation: ${fadeIn} 0.3s ease-in-out;
  }
  display: flex;
  justify-content: left;
  padding: 0 4.5rem;
  padding-bottom: 2rem;

  svg {
    font-size: 1rem;
  }

  button {
    cursor: pointer;
    transition: 0.3s all;
    padding: 0;
    margin-left: 1rem;
    width: 40px;
    height: 40px;
    border-radius: 1rem;
    background-color: transparent;
    outline: none;
    border: none;
    box-shadow: 7px 7px 15px #bbcfda, -4px -4px 13px #fff,
      inset 4px 4px 8px rgba(209, 217, 230, 0.2),
      inset -8px -8px 8px rgba(255, 255, 255, 0.2);

    &:hover {
      box-shadow: 4px 2px 18px #bbcfda, -4px -4px 13px #fff,
        inset 6px 6px 16px rgba(209, 217, 230, 0.8),
        inset -8px -8px 8px rgba(255, 255, 255, 0.2);
      transform: translateY(2px);
    }
  }
`;

const OwnTools = styled.div`
  display: flex;
  justify-content: center;

  button {
    cursor: pointer;
    transition: 0.3s all;
    padding: 0;
    width: 40px;
    height: 40px;
    border-radius: 1rem;
    background-color: transparent;
    outline: none;
    border: none;
    font-size: 1rem;
    box-shadow: 7px 7px 15px #bbcfda, -4px -4px 13px #fff,
      inset 4px 4px 8px rgba(209, 217, 230, 0.2),
      inset -8px -8px 8px rgba(255, 255, 255, 0.2);

    @media (max-width: 970px) {
      width: 30px;
      height: 30px;
    }

    &:hover {
      box-shadow: 4px 2px 18px #bbcfda, -4px -4px 13px #fff,
        inset 6px 6px 16px rgba(209, 217, 230, 0.8),
        inset -8px -8px 8px rgba(255, 255, 255, 0.2);
      transform: translateY(2px);
    }
  }
`;

const Options = styled.div<{ show: boolean }>`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }

  button {
    padding: 1rem;
  }
`;

const Reference = styled.div`
  font-family: sans-serif;
  font-size: 0.9rem;
  //padding: 2rem;
  //padding-bottom: 0;
  span {
    all: unset;
    font-weight: bold;
    color: #834fe3;
    font-family: sans-serif;
    font-size: 0.9rem;
  }
`;

const Main = styled.div`
  div {
    transition: 0.3s all;
    display: grid;
    padding: 2rem;
    grid-template-columns: 5% 85%;
    column-gap: 5%;
    font-family: sans-serif;
    font-size: 1.125rem;
    color: #333333;
    font-weight: bold;
    box-shadow: 7px 7px 15px #bbcfda, -4px -4px 13px #fff,
      inset 4px 4px 8px rgba(209, 217, 230, 0.2),
      inset -8px -8px 8px rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    margin: 1rem;
    cursor: pointer;

    &:hover {
      box-shadow: 4px 2px 18px #bbcfda, -4px -4px 13px #fff,
        inset 6px 6px 16px rgba(209, 217, 230, 0.8),
        inset -8px -8px 8px rgba(255, 255, 255, 0.2);
      transform: translateY(2px);
    }

    span {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
    }

    div {
      all: unset;
      display: flex;
      justify-content: left;
      flex-direction: column;

      &:hover {
        box-shadow: none;
        transform: none;
      }

      * {
        margin: 0;
        font-family: sans-serif;
        color: #333333;
      }

      p {
        white-space: pre-wrap;
        margin-top: 1rem;
        text-align: left;
        overflow-wrap: break-word;
        word-wrap: break-word;
        hyphens: auto;
        font-weight: normal;
      }

      h5 {
        font-size: 1.125rem;
        font-weight: bold;
      }
    }
  }
`;

const PostCardMolecule: React.FC<PostCardProps> = ({
  message,
  id,
  profile,
  isLiked,
  fetchComments,
  own,
  fetchPost,
  single,
  parent,
  main,
}) => {
  const [liked, setLiked] = useState(false);
  const { authState } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [showComment, setShowComment] = useState(false);
  let header = { 'auth-token': authState?.token };
  const history = useHistory();

  const handleLike = async () => {
    setLiked(!liked);
    await giveLike(id, header);
  };

  const handleDelete = async () => {
    await deletePost(id, header);
    if (fetchPost) {
      await fetchPost();
    }
    if (fetchComments) {
      await fetchComments();
    }
  };

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked, own]);

  const handleChangeRoute = (route: string) => {
    history.push(route);
  };

  return (
    <Container single={single || false}>
      {parent && main && (
        <Main onClick={() => handleChangeRoute(`/post/${parent.id}`)}>
          <div>
            <span>
              <CgProfile />
            </span>
            <div>
              <h5>{main.profile.nickname}</h5>
              <p>{main.message}</p>
            </div>
          </div>
        </Main>
      )}
      {!show ? (
        <>
          <PostCard>
            <Link to={`/${profile.nickname}`}>
              <span>
                <CgProfile />
              </span>
            </Link>
            <div>
              <Link to={`/${profile.nickname}`}>
                <h5>{profile.nickname}</h5>
              </Link>
              <Link to={`/post/${id}`}>
                {parent && (
                  <Reference>
                    <p>
                      Responded to{' '}
                      <span
                        onClick={() =>
                          handleChangeRoute(`/${parent?.profile.nickname}`)
                        }
                      >
                        @{parent?.profile.nickname}
                      </span>
                    </p>
                  </Reference>
                )}
                <p>{message}</p>
              </Link>
            </div>
            {own && (
              <OwnTools>
                <button onClick={() => setShow(!show)}>
                  <BiTrashAlt />
                </button>
              </OwnTools>
            )}
          </PostCard>
          <CardTools>
            <button onClick={handleLike}>
              {liked ? <AiFillHeart color={'red'} /> : <AiOutlineHeart />}
            </button>
            <button onClick={() => setShowComment(!showComment)}>
              <FaRegCommentAlt />
            </button>
          </CardTools>
        </>
      ) : (
        <Options show={show}>
          <p>Are you sure yo want to delete it?</p>
          <div>
            <ButtomAtom
              type={'button'}
              size={'l'}
              stetic={'soft'}
              onClick={() => setShow(!show)}
            >
              Cancel
            </ButtomAtom>
            <ButtomAtom
              type={'button'}
              size={'l'}
              stetic={'soft'}
              onClick={handleDelete}
            >
              Delete
            </ButtomAtom>
          </div>
        </Options>
      )}
      <CreateCommentAlert
        fetchComments={fetchComments || undefined}
        fetchPosts={fetchPost || undefined}
        show={showComment}
        setShow={setShowComment}
        message={message}
        profile={profile}
        id={id}
      />
    </Container>
  );
};
export default PostCardMolecule;
