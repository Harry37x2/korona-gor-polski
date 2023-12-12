import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ButtonGroup, Button } from "@mui/material";
import Header from "../components/Header";
import Dashboard from "./Dashboard";
import Accordion from "../components/ui/Accordion";
import { DataContext } from "../contexts/DataContext";


const Profile = () => {
  const { currentUser, logout, error, setError } = useAuth();
  const navigate = useNavigate();

  
  const dataCtx = useContext(DataContext)
  const data = dataCtx.fetchedData
  const totalPeaksInChallenge = data.length

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("");
    } catch {
      setError("Failed to log out");
    }
  }

  const challenges = [
    {
        name: 'Korona gór Polski',
        link: 'peaks',
        // link: 'korona-gor-polski',
        desc: 'Korona Gór Polski – lista 28 szczytów poszczególnych pasm górskich Polski. W założeniu miała to być lista zawierająca najwyższy szczyt każdego pasma.'
    },
    {
        name: 'Diadem Gór Polski',
        link: 'peaks',
        // link: 'diadem-gor-polski',
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
        {/* <Link to="/peaks">
          <Button sx={{ m: 1 }}>Szczyty KGP</Button>
        </Link>
        <Link to="/profile">
          <Button sx={{ m: 1 }}>Szczyty Diadem</Button>
        </Link> */}
        <Button sx={{ m: 1 }} onClick={handleLogout}>
          Wyloguj
        </Button>
      </ButtonGroup>
      {challenges.map((challenge) => (
          <Accordion key={challenge.name} name={challenge.name} link={challenge.link} desc={challenge.desc} totalPeaksInChallenge={totalPeaksInChallenge}/>
      ))}
      <Dashboard />
    </>
  );
};

export default Profile;
