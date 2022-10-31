import React from 'react';
import {CgProfile} from "react-icons/cg";
import styled from "@emotion/styled";
import {profile} from "../../../types/generic";
import {fadeIn} from "../../../styles/animations";
import {useHistory} from "react-router-dom";

const ProfileCard = styled.div`
  cursor: pointer;
  transition: .2s all;
  width: calc(100% - 5rem);
  display: grid;
  grid-template-columns: 5% 90%;
  column-gap: 5%;
  box-shadow: 7px 7px 15px #bbcfda, -4px -4px 13px #fff,
  inset 4px 4px 8px rgba(209, 217, 230, 0.2),
    inset -8px -8px 8px rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  padding: 1rem;
  margin: 0.75rem;
  margin-bottom: 1.25rem;
  
  animation: ${fadeIn} .2s ease-in-out;
  
  &:hover{
    box-shadow: 4px 2px 18px #bbcfda, -4px -4px 13px #fff,
    inset 6px 6px 16px rgba(209, 217, 230, 0.8),
      inset -8px -8px 8px rgba(255, 255, 255, 0.2);
    transform: translateY(2px);
  }
  span{
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

interface ProfileCardProps {
    profile: profile
}

const ProfileCardAtom: React.FC<ProfileCardProps> = ({profile}) => {

    const history = useHistory();

    const handleRouteChange = (url: string) => {
        history.push(url)
    }

    return (
        <ProfileCard onClick={() => handleRouteChange(`/${profile.nickname}`)}>
            <span><CgProfile/></span>
            <p>{profile.nickname}</p>
        </ProfileCard>
    );
};

export default ProfileCardAtom;
