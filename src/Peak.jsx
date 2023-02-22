import React from 'react'
import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails,Typography, Button } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import HeightIcon from '@mui/icons-material/Height';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';


const Peak = ({peak}) => {
    const [expanded, setExpanded] = useState(false)
    const handleChange = (isExpanded, panel) => {
        setExpanded(isExpanded ? panel : false)
    }
    

  return (
    <Accordion
        expanded={expanded === `panel${peak.id}`}
        onChange={(event, isExpanded) => handleChange(isExpanded, `panel${peak.id}`)}
    >
        <AccordionSummary 
            id={`panel-${peak.id}-header`}
            aria-controls={`panel-${peak.id}-content`}
            expandIcon={<ExpandMoreIcon/>}
            variant={`${peak.visited === true ? 'done' : 'default'}`}
        >
            <Typography sx={{ width: '35%', flexShrink: 0, display:'flex', justifyContent: 'flex-start'}}>
                {`${peak.name}`}<HeightIcon/>{`${peak.altitude}m n.p.m`}
            </Typography>
            <Typography>                
                {peak.visited===true ? <span style={{display: 'flex'}}><WhereToVoteIcon/>{`Zdobyto dnia: ${peak.date}`}</span> : '' }
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div className='peakDetails'>
                <div className='peakDetails-left'>
                    <p>{`${peak.chain}`}</p>
                    <p>{`${peak.name}`}</p>
                    <HeightIcon/><span>{`${peak.altitude}m n.p.m`}</span>
                    <TrendingUpIcon/><span>{`${peak.elevation}m`}</span>
                    <ModeOfTravelIcon/><span>{`${peak.distance}km`}</span>
                    <TimelapseIcon/><span>{`${peak.time}`}</span>
                </div>
                <div className='peakDetails-right'>
                    {peak.visited === false 
                    ? <Button variant='contained'>Zatwierdź</Button>
                    : <Button variant='contained' disabled>Zdobyto</Button>}
                </div>
            </div>
        </AccordionDetails>
    </Accordion>
  )
}

export default Peak