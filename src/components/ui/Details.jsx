import React, {useContext, useState} from 'react'
import classes from './Details.module.css'
import Parameters from './Parameters'

import { collection } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase"

import { useAuth } from "../../contexts/AuthContext";
import { DataContext } from "../../contexts/DataContext";

import DateAndTimePicker from "../functional/DateAndTimePicker";


const Details = ({id, peak}) => {

    const { currentUser } = useAuth();
    const query = collection(db, "korona-gor-polski", id, currentUser.uid);
    const [subPeak, loading, error] = useCollectionData(query);
    const dataCtx = useContext(DataContext);
    const handleCheck = dataCtx.handleCheck
    const handleSubmit = dataCtx.handleSubmit
    const date = dataCtx.data
    const setDate = dataCtx.setDate

    function dateChangeHandler(value) {
        setDate(value);
        // console.log(date.format("D/MM/YYYY, hh:mm a"));
      }
    
 

  return (
    <div className={classes.details}>
        <div className={classes.left}>
            <h3>{peak?.chain}</h3>
            <h1>{peak?.name}</h1>
            <h4>Trudność: {peak?.difficulty}/3</h4>
            <div className={classes.parameters_wrapper}>
                <Parameters name={'Dystans'} data={`${peak?.distance}km`}/>
                <Parameters name={'Czas'} data={peak?.time}/>
                <Parameters name={'Podejście'} data={`${peak?.elevation}m`}/>
                <Parameters name={'Wys. bezwzgl'} data={`${peak?.altitude}m n.p.m`}/>
                <Parameters name={'Wejście'} data={peak?.free ? 'darmowe' : 'płatne'}/>
                <Parameters name={'Bufet'} data={peak?.food ? 'tak' : 'nie'}/>
                <Parameters name={'Z Psem?'} data={peak?.dog ? 'tak' : 'nie'}/>
                <Parameters name={'GOT'} data={`${peak?.got}pkt`}/>
            </div>
        </div>
        <div className={classes.right}>
              {subPeak == 0 ? (
                  <div className={classes.dateAndTime}>
                  <DateAndTimePicker
                      onChange={dateChangeHandler}
                      date={date}
                  />
                  <button
                  onClick={() => {
                      handleSubmit(peak.id);
                  }}
                  >Zatwierdź</button>
              </div>
              ) : (
                subPeak?.map((item) => (
                  <div key={Math.random()}>
                    {item.visited === false ? (
                        <div className={classes.dateAndTime}>
                            <DateAndTimePicker
                                onChange={dateChangeHandler}
                                date={date}
                            />
                            <button
                            onClick={() => {
                                handleSubmit(peak.id);
                            }}
                            >Zatwierdź</button>
                        </div>
                    ) : (
                      <div className={classes.zdobyto}>
                        <label>
                            <input
                            type="checkbox"
                            defaultChecked={true}
                            disabled="disabled"
                            />
                            Zdobyto !
                            <p>{item.date}</p>
                        </label>
                        <label>
                            <input
                            type="checkbox"
                            checked={item.bike}
                            value='bike'
                            onChange={(event) =>
                                handleCheck(event.target.value, peak.id)
                              }
                            />
                            Na rowerze
                        </label>
                        <label>
                            <input
                            type="checkbox"
                            checked={item.night}
                            value='night'
                            onChange={(event) =>
                                handleCheck(event.target.value, peak.id)
                              }
                            />
                            W nocy
                        </label>
                        <label>
                            <input
                            type="checkbox"
                            checked={item.snow}
                            value='snow'
                            onChange={(event) =>
                                handleCheck(event.target.value, peak.id)
                              }
                            />
                            Zimą
                        </label>
                        {/* <FormControlLabel
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
                        /> */}
                      </div>
                    )}
                  </div>
                ))
              )}
        </div>
    </div>
  )
}

export default Details