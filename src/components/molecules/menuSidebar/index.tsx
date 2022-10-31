import React, {useContext, useEffect, useState} from 'react';
import styled from "@emotion/styled";
import {Link, useHistory} from 'react-router-dom'
import {CgProfile} from 'react-icons/cg';
import {AiOutlineHome, AiOutlineSearch} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {AuthContext} from "../../../contexts/authContext";
import {hoverMenu} from "../../../styles/animations";
import {profile} from "../../../types/generic";
import {AiOutlineMenu} from "react-icons/all";

const MenuSideBar = styled.div<{ show: boolean }>`
  transition: .2s all;
  display: flex;
  justify-content: center;

  ul {
    padding: 0;
    margin: 0;
  }

  color: #333333;

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4.5rem 0;
    list-style: none;
    font-weight: bold;
    font-size: 1.5rem;
    cursor: pointer;
    width: 100%;
    transition: .1s;
    background-color: #e8eff5;
    box-shadow: 7px 7px 15px #bbcfda, -4px -4px 13px #fff,
    inset 4px 4px 8px rgba(209, 217, 230, 0.2),
      inset -8px -8px 8px rgba(255, 255, 255, 0.2);
    padding: 1rem;
    border-radius: 1rem;

    &:hover {
      box-shadow: 4px 2px 18px #bbcfda, -4px -4px 13px #fff,
      inset 6px 6px 16px rgba(209, 217, 230, 0.8),
        inset -8px -8px 8px rgba(255, 255, 255, 0.2);
      transform: translateY(2px);
    }

    a {
      width: 100%;
      height: 100%;
      text-decoration: none;
      color: inherit;
      display: inherit;
      align-items: inherit;
      justify-content: inherit;
    }

    p {
      margin: 0;
      padding-left: .5rem;
    }
  }

  @media (max-width: 970px) {
    right: 0;
    transform: ${({show}) => show ? "" : "translateX(80vw)"};
    position: fixed;
    background-color: rgb(232, 239, 245);
    z-index: 100000;
    width: 80vw;
    height: 100vh;
    ul {
      margin-top: 5rem;
      width: 100%;
    }

    li {
      width: calc(100% - 2rem);
      margin: 0;
      border-radius: 0;
      box-shadow: none;
      padding: 2rem 1rem;
    }
  }
`
const Nav = styled.nav`
  width: 100%;
  height: 4rem;
  box-shadow: 7px 7px 15px #bbcfda, -4px -4px 13px #fff,
  inset 4px 4px 8px rgba(209, 217, 230, 0.2),
    inset -8px -8px 8px rgba(255, 255, 255, 0.2);
  background-color: rgb(232, 239, 245);
  position: fixed;
  top: 0;
  z-index: 100;
  display: none;
  font-size: 2rem;
  justify-content: flex-end;
  align-items: center;

  span {
    margin-right: 3rem;
    cursor: pointer;
  }

  @media (max-width: 970px) {
    display: flex;
  }
`

const Background = styled.div<{show: boolean}>`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,.3);
  width: 100%;
  height: 100%;
  z-index: 101;
  display: ${({show}) => show ? "block" : "none"};
`

const Love = styled.div`
  font-size: 1rem;
  font-weight: normal;
  color: rgba(0,0,0,.5);
`

const MenuSidebarMolecule = () => {

    const [profile, setProfile] = useState<profile | {}>({});
    const [show, setShow] = useState(false);

    const history = useHistory();
    const {authState, authDispatch} = useContext(AuthContext)

    useEffect(() => {
        authState?.profile?.then(d => setProfile(d));
    }, [])

    const handleChageRoute = (url: string) => {
            setShow(false)
        history.push(url)
    }

    return (
        <>
            <Background show={show} onClick={() => setShow(!show)}/>
            <Nav><span onClick={() => setShow(!show)}><AiOutlineMenu/></span></Nav>
            <MenuSideBar show={show || false}>
                <ul>
                    <li onClick={() => handleChageRoute("/home")}><AiOutlineHome/><p>Home</p></li>
                    <li onClick={() => handleChageRoute(`/${(profile as profile).nickname}`)}><CgProfile/><p>Profile</p>
                    </li>
                    <li onClick={() => handleChageRoute("/search")}><AiOutlineSearch/><p>Search</p></li>
                    <li onClick={() => authDispatch && authDispatch({type: "LOG_OUT"})}><FiLogOut/><p>Log out</p></li>
                    <li><Love>MADE WITH LOVE BY BLOPA</Love></li>
                </ul>
            </MenuSideBar>
        </>
    );
};

export default MenuSidebarMolecule;
