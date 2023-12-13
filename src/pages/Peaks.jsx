import React, { useContext, useEffect, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";

import PeaksCarts from "./PeaksCarts";
import CardsWrapper from "../components/ui/CardsWrapper";
import { DataContext } from "../contexts/DataContext";

const KGPpeaks = () => {
  const [date, setDate] = useState(moment());
  const dataCtx = useContext(DataContext)
  const peaksList = dataCtx.fetchedData

  // useEffect(()=>{
  //   dataCtx.fetchData('korona-gor-polski')
  // },[])
  // console.log(dataCtx)

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
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Link to="/profile">
          <Button sx={{ m: 1 }}>Cofnij</Button>
        </Link>
        <Link to="/profile">
          <Button sx={{ m: 1 }}>Konto</Button>
        </Link>
      </ButtonGroup>
      {dataCtx.isLoading && <p>Loading...</p>}
      {dataCtx.fetchError && "Error"}
      <CardsWrapper>
        {peaksList.map((peak) => (
          <PeaksCarts
            key={peak.id}
            peak={peak}
            date={date}
            dateChangeHandler={dataCtx.dateChangeHandler}
            handleSubmit={dataCtx.handleSubmit}
            handleCheck={dataCtx.handleCheck}
          />
        ))}
      </CardsWrapper>
    </>
  );
};

export default KGPpeaks;