import React, {useContext, useEffect} from "react";
import { Link, useNavigate, redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ButtonGroup, Button } from "@mui/material";
import Header from "../components/Header";
import Dashboard from "./Dashboard";
import Accordion from "../components/ui/Accordion";
import { DataContext } from "../contexts/DataContext";


const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const dataCtx = useContext(DataContext)
  const data = dataCtx.fetchedData
  const totalPeaksInChallenge = data.length

   useEffect(()=>{
    dataCtx.fetchData('korona-gor-polski')
  },[])

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("");
    } catch {
      setError("Failed to log out");
    }
  }
  //need to restructure database to get data below from there. my bad :(
  const challenges = [
    {
        name: 'Korona gór Polski',
        collectionName: 'korona-gor-polski',
        link: '/peaks',
        desc: 'Korona Gór Polski – lista 28 szczytów poszczególnych pasm górskich Polski. W założeniu miała to być lista zawierająca najwyższy szczyt każdego pasma.'
    },
    {
        name: 'Diadem Gór Polski',
        collectionName: 'diadem-polskich-gor',
        link: '/peaks',
        desc: 'Diadem Polskich Gór jest  odznaką turystyki kwalifikowanej ustanowioną w 2013 roku przez Komisję Turystyki Górskiej Oddziału Wrocławskiego PTTK. Ma ona na celu popularyzację turystyki górskiej i krajoznawczej oraz zachęcanie do systematycznego poznawania polskich gór.'
    }
]

  return (
    <>
    <Header />
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Link to="/update-profile">
          <Button sx={{ m: 1 }}>Konto: {currentUser.email}</Button>
        </Link>
        <Button sx={{ m: 1 }} onClick={handleLogout}>
          Wyloguj
        </Button>
      </ButtonGroup>
      {challenges.map((challenge) => (
          <Accordion key={challenge.name} name={challenge.name} link={challenge.link} desc={challenge.desc} totalPeaksInChallenge={totalPeaksInChallenge} collectionName={challenge.collectionName}/>
      ))}
      <Dashboard />
    </>
  );
};

export default Profile;
