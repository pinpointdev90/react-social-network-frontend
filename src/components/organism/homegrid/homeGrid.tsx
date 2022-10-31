import React from 'react';
import styled from "@emotion/styled";
import MenuSidebarMolecule from "../../molecules/menuSidebar";
import {fadeIn} from "../../../styles/animations";
import PostCreatorMolecule from "../../molecules/postCreator";
import PostsOrganism from "../posts";

const HomeGrid = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  z-index: 1;
  grid-template-columns: auto 39.25rem auto;
  background-color: #e8eff5;

  @media (max-width: 970px) {
    display: flex;
  }
`

const Soon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (max-width: 970px) {
    display: none;
  }
`

const V1 = styled.div`
  max-width: 18rem;
  box-shadow: 7px 7px 15px #bbcfda, -4px -4px 13px #fff,
  inset 4px 4px 8px rgba(209, 217, 230, 0.2),
    inset -8px -8px 8px rgba(255, 255, 255, 0.2);
  padding: 1rem;
  border-radius: 1rem;
  font-family: sans-serif;

  h2 {
    font-size: 2rem;
  }

  p {
    white-space: pre-wrap;
  }
`
const HomeGridOrganism = () => {


    return (
        <HomeGrid>
            <MenuSidebarMolecule/><PostsOrganism/><Soon><V1><h2>WELCOME TO V1</h2><p>welcome to the first version
            :D,<br/>I've been working in this new project from a few days <br/>I hope you like it <br/>some features are
            comming in the next days please talk to me to <br/> - pabloosabaterr@gmail.com <br/> to report bugs or
            suggest some features you also can talk to me through discord<br/> - Blopa#4034</p></V1></Soon>
        </HomeGrid>
    );
};

export default HomeGridOrganism;
