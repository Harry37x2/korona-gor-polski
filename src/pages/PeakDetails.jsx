import React, { useContext } from "react";
import { useParams } from "react-router";
import Details from "../components/ui/Details";

import { Link } from "react-router-dom";
import { DataContext } from "../contexts/DataContext";

import { Button, ButtonGroup } from "@mui/material";

const PeakDetails = () => {
  const { peakId } = useParams();
  const dataCtx = useContext(DataContext);
  const filteredPeak = dataCtx.fetchedData.filter((peak) => peak.id === peakId);

  return (
    <>
    <div>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Link to="../">
          <Button sx={{ m: 1 }}>Cofnij</Button>
        </Link>
        <Link to="/profile">
          <Button sx={{ m: 1 }}>Konto</Button>
        </Link>
      </ButtonGroup>
    </div>
      <Details id={peakId} peak={filteredPeak[0]}/>
    </>
  );
};

export default PeakDetails;
