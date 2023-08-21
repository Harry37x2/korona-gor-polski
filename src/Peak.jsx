import React from "react";
import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import PaidIcon from "@mui/icons-material/Paid";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PetsIcon from "@mui/icons-material/Pets";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HeightIcon from "@mui/icons-material/Height";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import DateAndTimePicker from "./DateAndTimePicker";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { collection } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "./firebase";
import { useAuth } from "./contexts/AuthContext";
import { orderBy, limit } from "firebase/firestore";

import Grid from "@mui/material/Unstable_Grid2";

import Stack from "@mui/material/Stack";

import Link from "@mui/material/Link";

const Peak = ({
  peak,
  handleSubmit,
  handleCheck,
  expanded,
  setExpanded,
  date,
  dateChangeHandler,
}) => {
  const { currentUser } = useAuth();
  const query = collection(db, "korona-gor-polski", peak.id, currentUser.uid);
  const [subPeak, loading, error] = useCollectionData(query);
  console.log(subPeak);

  const handleChange = (isExpanded, panel) => {
    setExpanded(isExpanded ? panel : false);
  };
  // console.log(peak);
  const respAccSum = {
    // display: "flex",
    // justifyContent: "space-between",
  };

  const respAccSumTypoLeft = {
    width: { xs: "100%", md: "50%", lg: "25%" },
    flexShrink: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };
  const respAccSumTypoRight = {
    display: { xs: "none", md: "flex", lg: "flex" },
    marginLeft: "5%",
  };
  const accDetailsContainer = {
    display: { lg: "flex" },
    justifyContent: { xs: "center" },
    alignItems: { xs: "center" },
    flexDirection: { xs: "column", md: "row", lg: "row" },
    // padding: 2,
  };
  const accDetailsLeft = {
    width: { md: "100%", lg: "45%" },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    flexGrow: 1,
    padding: 2,
  };
  const accDetailsRight = {
    width: { md: "100%", lg: "45%" },
    display: "flex",
    justifyContent: { xs: "center", md: "left", lg: "left" },
    alignItems: { xs: "center", md: "left", lg: "left" },
    flexDirection: "column",
    padding: 2,
  };
  const checkBoxes = {
    marginLeft: 0,
  };
  const detailsIcon = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    margin: 1,
    backgroundColor: "#1E1E1E",
    width: 100,
  };

  function Item({ difflvl }) {
    if (difflvl === 1) {
      return (
        <>
          <span>Łatwa</span>
          <span>
            <FiberManualRecordIcon sx={{ height: 10 }} />
          </span>
        </>
      );
    } else if (difflvl === 2) {
      return (
        <>
          <span>Średnia</span>
          <span>
            <FiberManualRecordIcon sx={{ height: 10 }} />
            <FiberManualRecordIcon sx={{ height: 10 }} />
          </span>
        </>
      );
    } else if (difflvl === 3) {
      return (
        <>
          <span>Trudna</span>
          <span>
            <FiberManualRecordIcon sx={{ height: 10 }} />
            <FiberManualRecordIcon sx={{ height: 10 }} />
            <FiberManualRecordIcon sx={{ height: 10 }} />
          </span>
        </>
      );
    }
  }
  return (
    <div>
      {/* {loading && "Loading..."}  better in dashboard*/}
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
          variant={`${subPeak?.map((item) =>
            item.visited === true ? "done" : "default"
          )}`}
        >
          <Typography sx={respAccSumTypoLeft}>
            {`${peak.name}`}
            <span>
              <HeightIcon />
              {`${peak.altitude}m n.p.m`}
            </span>
          </Typography>
          <Typography sx={respAccSumTypoRight}>
            {subPeak?.map((item) => (
              <span key={Math.random()} style={{ display: "flex" }}>
                {item.visited === true ? (
                  <span>
                    <WhereToVoteIcon />
                    {`Zdobyto dnia: ${item.date}`}
                  </span>
                ) : (
                  ""
                )}
              </span>
            ))}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: "#242424",
          }}
        >
          <Grid container sx={accDetailsContainer}>
            <Grid sx={accDetailsLeft}>
              <Typography
                variant="h4"
                sx={{
                  borderBottom: "3px solid green",
                }}
              >
                {`${peak.chain}`}
              </Typography>
              <Typography
                sx={{ margin: 1 }}
                variant="h2"
              >{`${peak.name}`}</Typography>
              <Link sx={{ margin: 1 }} href={`${peak.link}`}>
                <InfoIcon />
              </Link>
              <Item difflvl={peak.difficulty} />

              {/* <Link href={`${peak.link}`}>
                <InfoIcon />
              </Link> */}

              <Grid container xs={12} sx={{ justifyContent: "center" }}>
                <Grid xs={2.5} sx={detailsIcon}>
                  <ModeOfTravelIcon />
                  <span className="tooltip">
                    {`${peak.distance}km`}
                    <span className="tooltiptext">{"dystans"}</span>
                  </span>
                </Grid>
                <Grid xs={2.5} sx={detailsIcon}>
                  <TimelapseIcon />
                  <span className="tooltip">
                    {`${peak.time}`}
                    <span className="tooltiptext">{"czas"}</span>
                  </span>
                </Grid>
                <Grid xs={2.5} sx={detailsIcon}>
                  <TrendingUpIcon />
                  <span className="tooltip">
                    {`${peak.elevation}m`}
                    <span className="tooltiptext">{"suma podejść"}</span>
                  </span>
                </Grid>
                <Grid xs={2.5} sx={detailsIcon}>
                  <HeightIcon />
                  <span className="tooltip">
                    {`${peak.altitude}m n.p.m`}
                    <span className="tooltiptext">{"wys. bezwzględna"}</span>
                  </span>
                </Grid>
                <Grid xs={2.5} sx={detailsIcon}>
                  <PaidIcon />
                  <span className="tooltip">
                    {`${peak.free === false ? "płatne" : "darmowe"}`}
                    <span className="tooltiptext">{"wejście"}</span>
                  </span>
                </Grid>
                <Grid xs={2.5} sx={detailsIcon}>
                  <RestaurantIcon />
                  <span className="tooltip">
                    {`${peak.food === false ? "nie" : "tak"}`}
                    <span className="tooltiptext">{"bufet na trasie"}</span>
                  </span>
                </Grid>
                <Grid xs={2.5} sx={detailsIcon}>
                  <PetsIcon />
                  <span className="tooltip">
                    {`${peak.dog === false ? "nie" : "tak"}`}
                    <span className="tooltiptext">{"Z psem?"}</span>
                  </span>
                </Grid>
                <Grid xs={2.5} sx={detailsIcon}>
                  <MilitaryTechIcon />
                  <span className="tooltip">
                    {`${peak.got}pkt GOT`}
                    <span className="tooltiptext">
                      {"górska odznaka turystyczna"}
                    </span>
                  </span>
                </Grid>
              </Grid>
            </Grid>

            <Grid sx={accDetailsRight}>
              {subPeak == 0 ? (
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
                subPeak?.map((item) => (
                  <div key={Math.random()}>
                    {item.visited === false ? (
                      <Stack spacing={2} alignItems={"center"}>
                        <DateAndTimePicker
                          onChange={dateChangeHandler}
                          date={date}
                        />
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
                      <FormGroup sx={checkBoxes}>
                        <FormControlLabel
                          disabled
                          control={<Checkbox defaultChecked />}
                          label="Zdobyto"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={item.bike}
                              value="bike"
                              onChange={(event) =>
                                handleCheck(event.target.value, peak.id)
                              }
                            />
                          }
                          label="Na rowerze"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={item.night}
                              value="night"
                              onChange={(event) =>
                                handleCheck(event.target.value, peak.id)
                              }
                            />
                          }
                          label="W nocy"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={item.snow}
                              value="snow"
                              onChange={(event) =>
                                handleCheck(event.target.value, peak.id)
                              }
                            />
                          }
                          label="Po śniegu"
                        />
                      </FormGroup>
                    )}
                  </div>
                ))
              )}
            </Grid>
            {/* </div> */}
            {/* </div> */}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Peak;
