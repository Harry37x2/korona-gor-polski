import React, { useEffect, useState } from "react";
import axios from "axios";
import Peak from "./Peak";
import moment from "moment";

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
        setPeaksList(listItems);
        // console.log(listItems);
        setFetchError(null);
      });
      return () => unsubscribe();
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = async (id) => {
    // console.log(id);
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

  useEffect(() => {
    fetchData();
    // fetchSubData();
  }, []);

  function dateChangeHandler(value) {
    setDate(value);
    // console.log(date.format("D/MM/YYYY, hh:mm a"));
  }

  return (
    <>
      {peaksList.map((peak) => (
        <Peak
          date={date}
          dateChangeHandler={dateChangeHandler}
          key={peak.id}
          peak={peak}
          handleSubmit={handleSubmit}
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
