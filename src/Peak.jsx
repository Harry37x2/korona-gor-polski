import React from 'react'
import { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails,Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import HeightIcon from '@mui/icons-material/Height';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';

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
            variant='done'
        >
            {`${peak.name}`}<HeightIcon/>{`${peak.altitude}m n.p.m`}
        </AccordionSummary>
        <AccordionDetails>
            <div className='peakDetails'>
                <div className='peakDetails-left'>
                    <p>{`${peak.chain}`}</p>
                    <p>{`${peak.name}`}</p>
                    <span><HeightIcon/>{`${peak.altitude}m n.p.m`}</span>
                    <span><TrendingUpIcon/>{`${peak.elevation}m`}</span>
                    <span><ModeOfTravelIcon/>{`${peak.distance}km`}</span>
                    <span><TimelapseIcon/>{`${peak.time}`}</span>
                </div>
                <div className='peakDetails-right'>2</div>
            </div>
        </AccordionDetails>
    </Accordion>
  )
}

export default Peak