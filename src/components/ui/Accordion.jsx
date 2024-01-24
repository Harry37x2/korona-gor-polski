import React, { useState, useContext, useEffect} from "react";
import classes from "./Accordion.module.css";
import { Link, useNavigate,  } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";

import { motion } from "framer-motion";
const variants = {
    open: {opacity:1 , y:0, transition: {duration:2}},
    closed: {opacity: 0, y: '-10%'},    
  }

const Accordion = ({ name, tag, link, desc, totalPeaksInChallenge, collectionName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dataCtx = useContext(DataContext);  
  const navigate = useNavigate()
  
  function accordionHandler() {
    setIsOpen((prev) => !prev);
  }
  
  let css;
  if (isOpen) {
    css = classes.visible;
  } else {
    css = classes.hidden;
  }
  
  function forwardHandler() {
    dataCtx.fetchData(tag)
    navigate('/peaks')
  }

  

  return (
    <motion.div
      className={classes.accordion_wrapper}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className={classes.accordion}>
        <h2>{name}</h2>
        <h3>Twój postęp: 0/{totalPeaksInChallenge}</h3>
        <div>
          <button onClick={accordionHandler}>info</button>
          <button onClick={forwardHandler}>szczyty
            {/* <Link to={`/${link}`}>szczyty</Link> */}
          </button>
        </div>
      </div>
      <motion.div className={css} animate={isOpen ? 'open' : 'closed'} variants={variants}>
        <p>{desc}</p>
      </motion.div>
    </motion.div>
  );
};

export default Accordion;
