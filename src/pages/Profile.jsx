import React, { useContext, useEffect } from "react";
import { Link, useNavigate, redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ButtonGroup, Button } from "@mui/material";
import Header from "../components/Header";
import Accordion from "../components/ui/Accordion";
import { DataContext } from "../contexts/DataContext";


const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const dataCtx = useContext(DataContext);
  const data = dataCtx.fetchedData;

  let inChallengesFields = [];
  data.forEach((element) => {
    if (element.inChallenges !== undefined) {
      inChallengesFields = inChallengesFields.concat(element.inChallenges);
    }
  });
  // console.log(inChallengesFields);

  // unikalne pola wyzwań (kgp,diadem)
  let uniqeChallengesFields = [...new Set(inChallengesFields)]
  // console.log(uniqeChallengesFields)

  // ilość dla kgp, diadem
  let i = 0
  let j = 0
  inChallengesFields.forEach((element) => {
    if(element === uniqeChallengesFields[0]) {
      i += 1
    } else if (element === uniqeChallengesFields[1]){
      j += 1
    }
  })

const challenges = [
  {
    field: uniqeChallengesFields[0],
    quantity: i,
    name: "Korona gór Polski",
    tag: 'kgp',
    collectionName: "korona-gor-polski",
    link: "/peaks",
    desc: "Korona Gór Polski – lista 28 szczytów poszczególnych pasm górskich Polski. W założeniu miała to być lista zawierająca najwyższy szczyt każdego pasma.",
  },
  {
    field: uniqeChallengesFields[1],
    quantity: j,
    name: "Diadem Gór Polski",
    tag: 'diadem',
    collectionName: "diadem-polskich-gor",
    link: "/peaks",
    desc: "Diadem Polskich Gór jest  odznaką turystyki kwalifikowanej ustanowioną w 2013 roku przez Komisję Turystyki Górskiej Oddziału Wrocławskiego PTTK. Ma ona na celu popularyzację turystyki górskiej i krajoznawczej oraz zachęcanie do systematycznego poznawania polskich gór.",
  },
]

  useEffect(() => {
    dataCtx.fetchData('fetchAll');
  }, []);

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
  // const challenges = [
  //   {
  //     name: "Korona gór Polski",
  //     collectionName: "korona-gor-polski",
  //     link: "/peaks",
  //     desc: "Korona Gór Polski – lista 28 szczytów poszczególnych pasm górskich Polski. W założeniu miała to być lista zawierająca najwyższy szczyt każdego pasma.",
  //   },
  //   {
  //     name: "Diadem Gór Polski",
  //     collectionName: "diadem-polskich-gor",
  //     link: "/peaks",
  //     desc: "Diadem Polskich Gór jest  odznaką turystyki kwalifikowanej ustanowioną w 2013 roku przez Komisję Turystyki Górskiej Oddziału Wrocławskiego PTTK. Ma ona na celu popularyzację turystyki górskiej i krajoznawczej oraz zachęcanie do systematycznego poznawania polskich gór.",
  //   },
  // ];

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
        <Accordion
          key={challenge.name}
          name={challenge.name}
          tag={challenge.tag}
          link={challenge.link}
          desc={challenge.desc}
          totalPeaksInChallenge={challenge.quantity}
          collectionName={challenge.collectionName}
        />
      ))}
    </>
  );
};

export default Profile;
