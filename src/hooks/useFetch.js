import { useEffect, useState } from "react";

import {
    query,
    collection,
    onSnapshot,
    updateDoc,
    doc,
    setDoc,
    addDoc,
  } from "@firebase/firestore";
import { db } from ".././firebase";

export function useFetch(initialValue) {
    const [fetchedData, setFetchedData] = useState(initialValue);
    const [fetchError, setFetchError] = useState();
    const [isLoading, setIsLoading] = useState();

    useEffect(()=>{
        function fetchData() {
            try {
              const q = query(collection(db, "korona-gor-polski"));
              const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let listItems = [];
                querySnapshot.forEach((peak) => {
                  listItems.push({ ...peak.data(), id: peak.id });
                });
                setTimeout(()=>{
                  setFetchedData(listItems);
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
          fetchData()
    },[]);

    return {
        fetchedData, 
        setFetchedData,
        fetchError,
        setFetchError,
        isLoading,
        setIsLoading
    }
}