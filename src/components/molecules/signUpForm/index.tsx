import styled from '@emotion/styled';
import React, {FormEvent, useContext, useEffect, useState} from 'react';
import ButtomAtom from '../../atoms/button';
import InputAtom from '../../atoms/input';
import {AuthContext} from "../../../contexts/authContext";
import FormErrorAtom from "../../atoms/formError";
import {signUp} from "../../../services/authServices";
import {getProfile} from "../../../services/userServices";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 31.25rem;
  width: 100%;

  button {
    padding: 1rem;
  }
`;

const Container = styled.div`
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    width: 100%;
    font-size: 2rem;
    text-align: left;
    font-weight: bold;
  }
  @media (max-width: 1150px) {
    position: static;
    max-width: 31.25rem;
    width: calc(100% - 2rem);
    height: auto;
    div{
      width: calc(100% - 2rem);
      height: auto;
      position: static;
      padding: 1rem;
      p{
        margin: 0;
      }
    }
  }
`;

const SignUpFormMolecule = () => {
    const [signUpForm, setSignUpForm] = useState<{ Password?: string, Email?: string, Nickname?: string, Username?: string }>({});
    const [passwordRep, setPasswordRep] = useState<{ "Repeat Password"?: string }>({});
    const [error, setError] = useState({message: '', error: false});
    const {authDispatch, authState} = useContext(AuthContext);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!signUpForm.Password || !signUpForm.Email || !signUpForm.Nickname || !signUpForm.Username) {
            setError({message: "nickname, email and password must be fullfilled", error: true})
            return;
        }
        if (passwordRep["Repeat Password"] != signUpForm.Password) {
            setError({message: "both passwords must be the same", error: true})
            return;
        }
        if (!authDispatch) throw new Error("no dispatch")
        const signup = await signUp({
            email: signUpForm.Email,
            password: signUpForm.Password,
            nickname: signUpForm.Nickname,
            username: signUpForm.Username
        })
        if (signup.message) {
            setError({message: signup.message, error: true})
        } else {
            authDispatch({
                type: "LOG_IN", payload: {
                    token: signup.data.token,
                    profile: getProfile({"auth-token": signup.data.token}).then(d => d.data)
                }
            })
        }
    }

    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <p>Sign Up</p>
                    <InputAtom
                        name="Username"
                        sendValue={setSignUpForm}
                        lastFormValue={signUpForm}
                        formType="text"
                    /><InputAtom
                    name="Nickname"
                    sendValue={setSignUpForm}
                    lastFormValue={signUpForm}
                    formType="text"
                />
                    <InputAtom
                        name="Email"
                        sendValue={setSignUpForm}
                        lastFormValue={signUpForm}
                        formType="text"
                        pattern="[\s\S]{1,}[@]{1}[\s\S]{1,}[.][\s\S]{1,}"
                    />
                    <InputAtom
                        name="Password"
                        sendValue={setSignUpForm}
                        lastFormValue={signUpForm}
                        formType="password"
                        pattern="[\s\S]{6,}"
                    />
                    <InputAtom
                        name="Repeat Password"
                        sendValue={setPasswordRep}
                        lastFormValue={passwordRep}
                        formType="password"
                        pattern="[\s\S]{6,}"
                    />
                    <ButtomAtom type="submit" size="xl" stetic="soft">
                        Submit
                    </ButtomAtom>
                </Form>
            </Container>
            {error.error && <FormErrorAtom message={error.message} bottom/>}
        </>
    );
};

export default SignUpFormMolecule;
