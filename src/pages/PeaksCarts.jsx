import React, { useState } from "react";
import { collection } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import Card from "../components/ui/Card";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

const PeaksCards = ({ peak }) => {
  const { currentUser } = useAuth();
  const query = collection(db, "korona-gor-polski", peak.id, currentUser.uid);
  const [subPeak, loading, error] = useCollectionData(query);

  let visited = "visited_false";
  if (subPeak?.length > 0) {
    visited = "visited_true";
  }
  
  let rand = Math.random()
  return (
    <motion.div
      initial={{ opacity: 0, y: rand*200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: rand*2 }}
    >
      <Card className={visited} peak={peak} subPeak={subPeak}/>
    </motion.div>
  );
};

export default PeaksCards;
