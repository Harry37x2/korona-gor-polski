import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import Peak from "./Peak";
import moment from "moment";
import LinearProgress from '@mui/material/LinearProgress';

import { useAuth } from "./contexts/AuthContext";

import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  addDoc,
} from "@firebase/firestore";
import { db } from "./firebase";

// const url = "http://localhost:3000/peaks";
const Dashboard = () => {
  const [peaksList, setPeaksList] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [date, setDate] = useState(moment());
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  function fetchData() {
    try {
      const q = query(collection(db, "korona-gor-polski"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let listItems = [];
        querySnapshot.forEach((peak) => {
          listItems.push({ ...peak.data(), id: peak.id });
        });
        setTimeout(()=>{
          setPeaksList(listItems);
          setFetchError(null);
        },1500)
        
      });
      return () => unsubscribe();
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setTimeout(()=>{
        setIsLoading(false);
      },1500)
    }
  }

  const handleSubmit = async (id) => {
    const submitedList = peaksList.map((item) =>
      item.id === id
        ? { ...item, visited: true, date: date.format("D/MM/YYYY, H:mm") }
        : item
    );
    setPeaksList(submitedList);

    const myItem = submitedList.filter((item) => item.id === id);
    await setDoc(
      doc(db, "korona-gor-polski", id, currentUser.uid, "userData"),
      {
        date: date.format("D/MM/YYYY o: HH:mm"),
        visited: true,
      }
    );
  };

  const handleCheck = async (value, id) => {
    const submitedList = peaksList.map((item) =>
      item.id === id ? { ...item, [value]: !item[value] } : item
    );
    setPeaksList(submitedList);

    const myItem = submitedList.filter((item) => item.id === id);
    await updateDoc(
      doc(db, "korona-gor-polski", id, currentUser.uid, "userData"),
      {
        [value]: myItem[0][value],
      }
    );
  };

  useEffect(() => {
    fetchData();
    // fetchSubData();
  }, []);

  function dateChangeHandler(value) {
    setDate(value);
    // console.log(date.format("D/MM/YYYY, hh:mm a"));
  }

  for (let i=0; i<peaksList.length; i++) {
    peaksList.sort((a,b)=>a.altitude - b.altitude)
  }

  return (
    <>
      <ButtonGroup
        sx={{ mb: 4 }}
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Link to="/profile">
          <Button>Konto</Button>
        </Link>
      </ButtonGroup>
      {isLoading && <LinearProgress />}
      {fetchError && "Error"}
      {peaksList.map((peak) => (
        <Peak
          date={date}
          dateChangeHandler={dateChangeHandler}
          key={peak.id}
          peak={peak}
          handleSubmit={handleSubmit}
          handleCheck={handleCheck}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}
    </>
  );
};

export default Dashboard;

// const handleSubmit = async (id) => {
//   console.log(id);
//   const submitedList = peaksList.map((item) =>
//     item.id === id
//       ? { ...item, visited: true, date: date.format("D/MM/YYYY, H:mm") }
//       : item
//   );
//   setPeaksList(submitedList);
//   const elementUrl = `${url}/${id}`;
//   const elementToUpdate = submitedList.filter((item) => item.id === id);
//   const valueToUpdate = {
//     visited: elementToUpdate[0].visited,
//     date: elementToUpdate[0].date,
//   };
//   console.log(valueToUpdate);
//   console.log(date);

//   const response = await axios
//     .patch(elementUrl, valueToUpdate)
//     .catch((error) => console.log(error));
//   // console.log(toUpdate[0].visited);
// };
