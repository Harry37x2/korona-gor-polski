import React, { useState} from "react";
import classes from "./Accordion.module.css";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

const Accordion = ({ name, link, desc, totalPeaksInChallenge }) => {
  const [isOpen, setIsOpen] = useState(false);
  

  function accordionHandler() {
    setIsOpen((prev) => !prev);
  }

  let css;
  if (isOpen) {
    css = classes.visible;
  } else {
    css = classes.hidden;
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
          <button>
            <Link to={`/${link}`}>szczyty</Link>
          </button>
        </div>
      </div>
      <div className={css}>
        <p>{desc}</p>
      </div>
    </motion.div>
  );
};

export default Accordion;
