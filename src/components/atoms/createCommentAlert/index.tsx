import React, {Dispatch, SetStateAction, useContext, useEffect, useRef} from 'react';
import ReactDOM from 'react-dom';
import styled from "@emotion/styled";
import {post, profile} from "../../../types/generic";
import {CgProfile} from "react-icons/cg";
import {fadeIn} from "../../../styles/animations";
import ButtomAtom from "../button";
import useForm from "../../../hooks/useForm";
import {createComment} from "../../../services/postServices";
import {AuthContext} from "../../../contexts/authContext";

interface CreateCommentProps {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    message: string;
    profile: profile;
    id: number;
    fetchComments?: () => Promise<void>;
    fetchPosts?: () => Promise<void>;
}

const BackGround = styled.div`
  cursor: pointer;
  animation: ${fadeIn} .2s ease-in-out;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
`

const Alert = styled.div`
  animation: ${fadeIn} .2s ease-in-out;
  border-radius: 1rem;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 25%;
  margin-top: 5rem;
  width: 50%;
  background-color: #e8eff5;
  display: flex;
  flex-direction: column;

  form {
    width: 100%;

    button {
      padding: 1rem;
      maring: 1rem;
    }

    textarea {
      width: calc(100% - 2rem);
      border: none;
      transition: .2s all;
      background-color: #e8eff5;
      box-shadow: 4px 2px 18px #bbcfda, -4px -4px 13px #fff,
      inset 6px 6px 16px rgba(209, 217, 230, 0.8),
        inset -8px -8px 8px rgba(255, 255, 255, 0.2);

      &:hover {
        transform: translateY(1px);
      }

      height: 100%;
      box-sizing: border-box;
      border-radius: 1rem;
      outline: none;
      resize: none;

      ::placeholder {
        color: rgba(51, 51, 51, 0.8);
      }

      font-size: 1.125rem;
      font-weight: bold;
      margin: 1rem;
      margin-bottom: 0;
      padding: 1rem;
      color: #333333;
      font-family: sans-serif;
    }
  }

  div {
    transition: .3s all;
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
`

const CreateCommentAlert: React.FC<CreateCommentProps> = ({
                                                              show,
                                                              setShow,
                                                              message,
                                                              id,
                                                              profile,
                                                              fetchComments,
                                                              fetchPosts
                                                          }) => {

    const {value, handleInputChange} = useForm({
        comment: ""
    })

    const {comment} = value as { comment: string }
    const {authState} = useContext(AuthContext);

    const handleInputSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createComment({message: comment, postId: id}, {"auth-token": authState?.token})
        setShow(!show);
        if (fetchComments) {
            await fetchComments()
        }
        if (fetchPosts) {
            await fetchPosts()
        }
        (value as { comment: string }).comment = ""
    }


    return (
        <>
            {
                show ? ReactDOM.createPortal(<>
                    <BackGround onClick={() => setShow(false)}/>
                    <Alert>
                        <div>
                            <span>
                                <CgProfile/>
                            </span>
                            <div><h5>{profile.nickname}</h5><p>{message}</p></div>
                        </div>
                        <form onSubmit={handleInputSubmit}>
                            <textarea placeholder={"write here"} name={"comment"} value={comment}
                                      onChange={handleInputChange}/>
                            <ButtomAtom type={"submit"} size={"l"} stetic={"soft"}>Comment</ButtomAtom>
                            <ButtomAtom type={"button"} size={"l"} stetic={"soft"}
                                        onClick={() => setShow(!show)}>Cancel</ButtomAtom>
                        </form>
                    </Alert>
                </>, (document.getElementById('portal') as HTMLElement)) : null
            }
        </>
    )
};

export default CreateCommentAlert;
