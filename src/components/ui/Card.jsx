import React from "react";
import classes from "./Card.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Card = ({ className, peak, subPeak }) => {
  let visited;
  if (className === "visited_true") {
    visited = classes.visited_true;
  } else {
    visited = classes.visited_false;
  }

  return (
    <Link to={peak?.id}>
    <motion.div
      whileHover={{ rotate: 5, scale: 1.2, transition: { duration: 1.2 } }}
      className={`${classes.card} ${visited}`}
    >
      {/* <div className={classes.difficulty}>
          <p>trudność: ***</p>
        </div> */}
        <div className={classes.card_content}>
          <div>
          <h3>{peak?.name}</h3>
          <p>{peak?.altitude}m n.p.m.</p>
          </div>
          {subPeak?.map((item) => (
            <div key={Math.random()}>
              {item.visited === true ? <div><p>Zdobyto! </p><h4>{`${item.date}`}</h4></div> : ""}
            </div>
          ))}
        </div>
    </motion.div>
      </Link>
  );
};

export default Card;
