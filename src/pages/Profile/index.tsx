import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import styled from "@emotion/styled";
import MenuSidebarMolecule from "../../components/molecules/menuSidebar";
import {post, profile, user} from "../../types/generic";
import {followProfile, getProfileByNickname, getProfileLikes} from "../../services/userServices";
import {AuthContext} from "../../contexts/authContext";
import {CgProfile} from "react-icons/cg";
import ButtomAtom from "../../components/atoms/button";
import LoadingAtom from "../../components/atoms/loading";
import {fadeIn} from "../../styles/animations";
import PostCardMolecule from "../../components/molecules/postCard";
import useProfile from "../../hooks/useProfile";

const Container = styled.div`
  display: grid;
  grid-template-columns: 23.375rem auto;
  @media(max-width: 970px){
    display: flex;
    justify-content: center;
  }
`

const Profile = styled.div`
  * {
    animation: ${fadeIn} .3s ease-in-out;
  }

  display: flex;
  flex-direction: column;
  height: 100vh;
  @media(max-width: 970px){
    width: 90%;
  }
`

const BackGround = styled.span`
  position: relative;
  margin: 3rem;
  margin-left: 0;
  margin-top: 4.5rem;
  width: calc(100% - 3rem);
  border-radius: 1rem;
  height: 20vh;
  content: "";
  box-shadow: 4px 2px 18px #bbcfda, -4px -4px 13px #fff,
  inset 6px 6px 16px rgba(209, 217, 230, 0.8),
    inset -8px -8px 8px rgba(255, 255, 255, 0.2);
  @media(max-width: 970px){
    width: 100%;
    margin-right: 0;
  }
`

const Image = styled.div`
  transition: .3s all;
  width: auto;
  height: 5rem;
  border-radius: 50%;
  background-color: rgb(232, 239, 245);
  font-size: 5rem;
  color: #333333;
  position: absolute;
  bottom: -3.5rem;
  padding: 1rem;
  left: 3rem;
  box-shadow: 7px 7px 15px #bbcfda, -4px -4px 13px #fff,
  inset 4px 4px 8px rgba(209, 217, 230, 0.2),
    inset -8px -8px 8px rgba(255, 255, 255, 0.2);

  &:hover {
    box-shadow: 4px 2px 18px #bbcfda, -4px -4px 13px #fff,
    inset 6px 6px 16px rgba(209, 217, 230, 0.8),
      inset -8px -8px 8px rgba(255, 255, 255, 0.2);
    transform: translateY(2px);
  }
`

const Options = styled.span`
  position: absolute;
  right: 0;
  bottom: -5rem;

  button {
    height: 3rem;
    padding: 0 1rem;
  }
`

const UserData = styled.div`
  margin-top: 1rem;
  margin-left: 4rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;

  p {
    color: #333333;
    font-weight: bold;
  }
`

const Description = styled.p`
  font-size: 0.9rem;
`

const UserPosts = styled.div`
  padding: 1rem 0 0 0;
  height: 100%;
  border-radius: 1rem 1rem 0 0;
  margin-right: 3rem;
  box-shadow: 4px 2px 18px #bbcfda, -4px -4px 13px #fff,
  inset 6px 6px 16px rgba(209, 217, 230, 0.8),
    inset -8px -8px 8px rgba(255, 255, 255, 0.2);
  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 0;
  }
  @media(max-width: 970px){
    margin-right: 0;
    width: 100%;
  }
`

const UserInfo = styled.div`
  span{
    font-weight: bold;
    font-family: sans-serif;
    color: #333333;
    margin-left: 1.5rem;
  }
`

const ProfilePage = () => {

    const {loading, profile, fetchProfile, profilePosts, likedOnes, contextProfile} = useProfile();
    const [own, setOwn] = useState(false);
    const {authState} = useContext(AuthContext);

    useEffect(() => {
        authState?.profile?.then(d => setOwn(d.id === profile.id))
    }, [profile])

    const handleFollowProfile = () => {
        console.log(profile.user_follow)
        followProfile(profile.id, {"auth-token": authState?.token}).then(d => fetchProfile());
    }

    return (
        <Container>
            <MenuSidebarMolecule/>
            <Profile>
                {
                    loading ? <LoadingAtom/> :
                        <>
                            <BackGround><Image><CgProfile/></Image>
                            <Options>{!own &&<ButtomAtom onClick={handleFollowProfile} type={"button"} size={"l"}
                                                 stetic={"soft"}>{!!profile.user_follow?.find((z: user) => z.profile.id == contextProfile.id) ? "unfollow" : "follow"}</ButtomAtom>}</Options>
                            </BackGround>
                            <UserData>
                                <p>{profile.nickname}</p>
                                {profile.description && <Description>{profile.description}</Description>}
                                <UserInfo><span>{profile.user_follow?.length} followers</span><span>{profile.user?.user_follow?.length} following</span></UserInfo>
                            </UserData>
                            <UserPosts>
                                {profilePosts.sort((a: post, b: post) => new Date(a.createdAt as string) < new Date(b.createdAt as string) ? 1 : -1).map((e: post) => (

                                    <PostCardMolecule key={e.id} message={e.message} id={e.id as number}
                                                      profile={e.profile} isLiked={!!likedOnes.find(x => x.id == e.id)}
                                                      own={own} fetchPost={fetchProfile} parent={e.post}
                                                      single/>
                                ))}

                            </UserPosts>
                        </>
                }
            </Profile>
        </Container>
    );
};

export default ProfilePage;
