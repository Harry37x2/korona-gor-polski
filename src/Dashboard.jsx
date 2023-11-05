import React, {useEffect, useState} from 'react'

import {
  query,
  collection,
  collectionGroup,
  where,
  onSnapshot,
  updateDoc,
  doc,
  setDoc,
  addDoc,
  getDocs
} from "@firebase/firestore";
import { db } from "./firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { useAuth } from "./contexts/AuthContext";
import { useFetch } from './hooks/useFetch';

const Dashboard = () => {
    const { currentUser } = useAuth();

    const {
        fetchedData: peaksList, 
        setFetchedData: setPeaksList,
        fetchError,
        setFetchError,
        isLoading,
        setIsLoading
    } = useFetch([]);    

    // console.log(peaksList)
    let querySnapshot

    async function get() {
      const museums = query(collectionGroup(db, 's9I5S0H4DjcApNZDtpVqdW0dNCi1'), where('visited', '==', 'true'));
      querySnapshot = await getDocs(museums);
      
      console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        console.log(doc.visited);
      });
    }
    get()
    

  //   let docs
  // async function getIt() {
  //   docs = await getDocs(collectionGroup(db, "name"));
  //   getIt()
  // }
  // console.log(docs)

      // const arr = [{got:1, visited: 'ok'}, {got:9, visited: 'ok'}]
      // let sum = 0
      // for(let i = 0; i<arr.length; i++){
      //   if (arr[i].visited === 'ok'){
      //       sum += arr[i].got
      //   }
      // }
      // console.log(sum)

    //   let sumGot = 0
    //     sumGot = peaksList.reduce((acc, cur) => ({got: acc.got + cur.got}))
    //   console.log(sumGot)

  return (
    <div>
      {querySnapshot}
    </div>
  )
}

export default Dashboard