import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Peak from './Peak'

const url = 'http://localhost:3000/peaks'
const Dashboard = () => {
    const [peaksList, setPeaksList] = useState([])
    const fetchData = async () => {
        try {
            const {data} = await axios(url,{
                headers: {
                    Accept: 'application/json'
                }
            })
            setPeaksList(data)
        } catch (error) {
            console.log(error.response)
        }
    }
    
    useEffect(()=>{
        fetchData();
        console.log(peaksList)
    },[])
    
    
    return (
    <>
    {peaksList.map((peak)=>(
        <Peak
            key={peak.id}
            peak={peak}
        />
    ))}
    </>
  )
}

export default Dashboard