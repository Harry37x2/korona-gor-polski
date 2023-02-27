import React from "react";
import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HeightIcon from "@mui/icons-material/Height";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import DateAndTimePicker from "./DateAndTimePicker";

const Peak = ({
  peak,
  handleSubmit,
  expanded,
  setExpanded,
  date,
  dateChangeHandler,
}) => {
  const handleChange = (isExpanded, panel) => {
    setExpanded(isExpanded ? panel : false);
  };

  const respAccSum = {};

  const respAccSumTypo1 = {
    width: { sm: "50%", md: "35%" },
    flexShrink: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  };
  const respAccSumTypo2 = {};

  return (
    <Accordion
      expanded={expanded === `panel${peak.id}`}
      onChange={(event, isExpanded) =>
        handleChange(isExpanded, `panel${peak.id}`)
      }
    >
      <AccordionSummary
        sx={respAccSum}
        id={`panel-${peak.id}-header`}
        aria-controls={`panel-${peak.id}-content`}
        expandIcon={<ExpandMoreIcon />}
        variant={`${peak.visited === true ? "done" : "default"}`}
      >
        <Typography sx={respAccSumTypo1}>
          {`${peak.name}`}
          <HeightIcon />
          {`${peak.altitude}m n.p.m`}
        </Typography>
        <Typography sx={respAccSumTypo2}>
          {peak.visited === true ? (
            <span style={{ display: "flex" }}>
              <WhereToVoteIcon />
              {`Zdobyto dnia: ${peak.date}`}
            </span>
          ) : (
            ""
          )}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="peakDetails">
          <div className="peakDetails-left">
            <p>{`${peak.chain}`}</p>
            <p>{`${peak.name}`}</p>
            <HeightIcon />
            <span className="tooltip">
              {`${peak.altitude}m n.p.m`}
              <span className="tooltiptext">{"wys. bezwzględna"}</span>
            </span>
            <TrendingUpIcon />
            <span className="tooltip">
              {`${peak.elevation}m`}
              <span className="tooltiptext">{"suma podejść"}</span>
            </span>
            <ModeOfTravelIcon />
            <span className="tooltip">
              {`${peak.distance}km`}
              <span className="tooltiptext">{"dystans"}</span>
            </span>
            <TimelapseIcon />
            <span className="tooltip">
              {`${peak.time}`}
              <span className="tooltiptext">{"czas"}</span>
            </span>
          </div>
          <div className="peakDetails-right">
            {peak.visited === false ? (
              <Stack spacing={2} alignItems={"center"}>
                <DateAndTimePicker onChange={dateChangeHandler} date={date} />
                <Button
                  variant="contained"
                  onClick={() => {
                    handleSubmit(peak.id);
                  }}
                >
                  Zatwierdź
                </Button>
              </Stack>
            ) : (
              <Button variant="contained" disabled>
                Zdobyto
              </Button>
            )}
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Peak;
