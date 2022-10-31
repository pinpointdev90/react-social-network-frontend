import styled from '@emotion/styled';
import React, {FormEvent, useContext, useEffect, useReducer, useState} from 'react';
import ButtomAtom from '../../atoms/button';
import InputAtom from '../../atoms/input';
import FormErrorAtom from "../../atoms/formError";
import AuthReducer from "../../../reducers/authReducer";
import {AuthContext} from "../../../contexts/authContext";
import {signIn} from "../../../services/authServices";
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
`;

const SignInFormMolecule = () => {
    const [signInForm, setsignInForm] = useState<{ Password?: string, Email?: string }>({});
    const [error, setError] = useState({message: '', error: false});
    const {authDispatch, authState} = useContext(AuthContext);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!signInForm.Password || !signInForm.Email) {
            setError({message: "email and password must be fullfilled", error: true})
            return;
        }
        if (!authDispatch) throw new Error("no dispatch")
        const signin = await signIn({email: signInForm.Email, password: signInForm.Password})
        if (signin.message) {
            setError({message: signin.message, error: true})
        } else {
            authDispatch({type: "LOG_IN",
                payload: {
                    token: signin.data.token,
                    profile: getProfile({"auth-token": signin.data.token}).then(d => d.data)
                }
            })
        }

    }

    return (
        <>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <p>Sign In</p>
                    <InputAtom
                        name="Email"
                        sendValue={setsignInForm}
                        lastFormValue={signInForm}
                        formType="text"
                        pattern="[\s\S]{1,}[@]{1}[\s\S]{1,}[.][\s\S]{1,}"
                    />
                    <InputAtom
                        name="Password"
                        sendValue={setsignInForm}
                        lastFormValue={signInForm}
                        formType="password"
                        pattern="[\s\S]{6,}"
                    />
                    <ButtomAtom type="submit" size="xl" stetic="soft">
                        Submit
                    </ButtomAtom>
                </Form>

            </Container>
            {error.error && <FormErrorAtom message={error.message}/>}
        </>
    );
};

export default SignInFormMolecule;
