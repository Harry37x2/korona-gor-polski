import React, { useContext } from "react";
import Card from "../components/ui/Card";
import { useParams } from "react-router";

import { Link } from "react-router-dom";
import { DataContext } from "../contexts/DataContext";

import { Button, ButtonGroup } from "@mui/material";

const PeakDetails = () => {
  const { peakId } = useParams();
  const dataCtx = useContext(DataContext);
  const filteredPeak = dataCtx.fetchedData.filter((peak) => peak.id === peakId);

  return (
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

      <div>
        {peakId}
        <p>{filteredPeak[0]?.name}</p>
      </div>
    </div>
  );
};

export default PeakDetails;
