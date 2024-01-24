import React, { useCallback, useContext, useEffect, useState } from "react";

import { query, where, collection, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";

import { useAuth } from "../contexts/AuthContext";

import { updateDoc, doc, setDoc } from "@firebase/firestore";
import moment from "moment";

export const DataContext = React.createContext();
export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children, tag }) {
  const [fetchedData, setFetchedData] = useState([]);
  const [fetchError, setFetchError] = useState();
  const [isLoading, setIsLoading] = useState();
  const { currentUser } = useAuth();
  const [date, setDate] = useState(moment());
  
  const fetchData = useCallback(function fetchData(tag) {
    setIsLoading(true);    
    try {
      if(tag === 'kgp' || tag === 'diadem'){
        const q = query(collection(db, "korona-gor-polski"), where("inChallenges", "array-contains", tag));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let listItems = [];
        querySnapshot.forEach((peak) => {          
          listItems.push({ ...peak.data(), id: peak.id });
          // console.log(peak.data().inChallenges.includes('kgp'))   
        });
        setFetchedData(listItems);
        setFetchError(null);     
      });
      return () => unsubscribe();
      } else {
        const q = query(collection(db, "korona-gor-polski"), where("inChallenges", "array-contains-any", ['kgp', 'diadem']));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let listItems = [];
          querySnapshot.forEach((peak) => {          
            listItems.push({ ...peak.data(), id: peak.id });
            // console.log(peak.data().inChallenges.includes('kgp'))   
          });
          setFetchedData(listItems);
          setFetchError(null);     
        });
        return () => unsubscribe();
      }
    } 
    catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(tag);
  }, []);

  const handleSubmit = async (id) => {
    const submitedList = fetchedData.map((item) =>
      item.id === id
        ? { ...item, visited: true, date: date.format("D/MM/YYYY, H:mm") }
        : item
    );
    setFetchedData(submitedList);

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
    const submitedList = fetchedData.map((item) =>
      item.id === id ? { ...item, [value]: !item[value] } : item
    );
    setFetchedData(submitedList);

    const myItem = submitedList.filter((item) => item.id === id);
    await updateDoc(
      doc(db, "korona-gor-polski", id, currentUser.uid, "userData"),
      {
        [value]: myItem[0][value],
      }
    );
  };

  const value = {
    fetchData,
    fetchedData,
    setFetchedData,
    fetchError,
    setFetchError,
    isLoading,
    setIsLoading,
    handleCheck,
    handleSubmit,
    date,
    setDate
  };

  return (
    <DataContext.Provider value={value}>
      {!isLoading && children}
    </DataContext.Provider>
  );
}
