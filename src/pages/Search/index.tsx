import React, {FormEvent, useContext, useEffect, useMemo, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import querystring from 'query-string';
import useForm from "../../hooks/useForm";
import InputAtom from "../../components/atoms/input";
import MenuSidebarMolecule from "../../components/molecules/menuSidebar";
import styled from "@emotion/styled";
import {getProfilesByNickname} from "../../services/userServices";
import {AuthContext} from "../../contexts/authContext";
import {profile} from "../../types/generic";
import ProfileCardAtom from "../../components/atoms/profileCard";

const SearchGrid = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  z-index: 1;
  grid-template-columns: 23.375rem auto;
  grid-template-areas: "menu posts";
  background-color: #e8eff5;

  form {
    margin-top: 4.5rem;
    width: 100%;

    input {
      margin-top: 0;
      width: calc(100% - 5rem);
      max-width: unset;
    }
    
    div{
      overflow-y: scroll;
      ::-webkit-scrollbar {
        width: 0;
      }
    }
  }
  @media(max-width: 970px){
    display: flex;
    form{
      display: flex;
      align-items: center;
      flex-direction: column;
      div{
        width: calc(100% - 3.5rem);
        div{
          width: (100% - 1rem);
        }
      }
    }
  }
`

const SearchPage = () => {
    let location = useLocation();
    let history = useHistory();
    const {authState} = useContext(AuthContext);
    const {q} = useMemo(() => querystring.parse(location.search), [location.search])
    const [search, setSearch] = useState<{ userSearch?: any }>({userSearch: q});
    const [profiles, setProfiles] = useState<profile[]>([]);

    const {userSearch} = search

    useEffect(() => {
        if(userSearch == ""){
            setProfiles([])
        }
        userSearch != "" && getProfilesByNickname(userSearch, {"auth-token": authState?.token}).then(d => setProfiles(d.data))
    }, [userSearch])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        history.push(`?q=${userSearch}`)
    }

    return (
        <SearchGrid>
            <MenuSidebarMolecule/>
            <form onSubmit={handleSubmit}>
                <InputAtom name={"userSearch"} sendValue={setSearch} lastFormValue={search} formType={"text"} initialValue={q as string}/>
                <div>
                    {profiles && profiles.map(e => (
                        <ProfileCardAtom key={e.id} profile={e}/>
                    ))}
                </div>
            </form>
        </SearchGrid>
    );
};

export default SearchPage;
