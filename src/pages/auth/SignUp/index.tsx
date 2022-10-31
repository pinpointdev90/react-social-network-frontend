import styled from '@emotion/styled';
import React from 'react';
import SignUpFormMolecule from '../../../components/molecules/signUpForm';
import {Link} from 'react-router-dom';
import {fadeIn} from "../../../styles/animations";

const Container = styled.div`
  padding: 4rem;
  padding-top: 6.625rem;
  margin-top: 0;
  display: flex;  
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 8rem);
  height: calc(100vh - 19.250rem);
  animation: ${fadeIn} .5s ease;

  @media (max-width: 450px) {
    padding: .5rem;
    padding-top: 6.625rem;
    width: calc(100% - 1rem);
    height: calc(100vh -  ( 6.625rem + .5rem));
    overflow: scroll;
  }
`;

const SignUpPage = () => {
    return (
        <Container>
            <SignUpFormMolecule/>
            <p>Already have an account? <Link to="/auth/signin">Sign in</Link> </p>
        </Container>
    );
};

export default SignUpPage;