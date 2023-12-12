import React, { useCallback, useContext, useEffect, useState } from "react";

import { query, collection, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";

import { useAuth } from "../contexts/AuthContext";

import {
  updateDoc,
  doc,
  setDoc,
} from "@firebase/firestore";

export const DataContext = React.createContext();
export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children, x = "korona-gor-polski" }) {
  
  const [fetchedData, setFetchedData] = useState([]);
  const [fetchError, setFetchError] = useState();
  const [isLoading, setIsLoading] = useState();  
  const { currentUser } = useAuth();
  const fetchData = useCallback( function fetchData(x) {
    setIsLoading(true)
    try {
      const q = query(collection(db, x));
      console.log(x)
      // const q = query(collection(db, "korona-gor-polski"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let listItems = [];
        querySnapshot.forEach((peak) => {
          listItems.push({ ...peak.data(), id: peak.id });
        });
          setFetchedData(listItems);
          setFetchError(null);
      });
      return () => unsubscribe();
    } catch (err) {
      setFetchError(err.message);
    } finally {
        setIsLoading(false);
    }
  },[])

  useEffect(() => {
    fetchData(x);
  }, []);

  const handleSubmit = async (id) => {
    const submitedList = peaksList.map((item) =>
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
    const submitedList = peaksList.map((item) =>
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
  };

  return (
    <DataContext.Provider value={value}>
      {!isLoading && children}
    </DataContext.Provider>
  );
}
