import React, { useEffect, useState } from "react";
import axios from "axios";
import Peak from "./Peak";
import moment from "moment";

const url = "http://localhost:3000/peaks";
const Dashboard = () => {
  const [peaksList, setPeaksList] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [date, setDate] = useState(moment());
  const currentDate = new Date().toLocaleDateString();
  console.log(currentDate);

  const fetchData = async () => {
    try {
      const { data } = await axios(url, {
        headers: {
          Accept: "application/json",
        },
      });
      setPeaksList(data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async (id) => {
    console.log(id);
    const submitedList = peaksList.map((item) =>
      item.id === id
        ? { ...item, visited: true, date: date.format("D/MM/YYYY, H:mm") }
        : item
    );
    setPeaksList(submitedList);
    const elementUrl = `${url}/${id}`;
    const elementToUpdate = submitedList.filter((item) => item.id === id);
    const valueToUpdate = {
      visited: elementToUpdate[0].visited,
      date: elementToUpdate[0].date,
    };
    console.log(valueToUpdate);
    console.log(date);

    const response = await axios
      .patch(elementUrl, valueToUpdate)
      .catch((error) => console.log(error));
    // console.log(toUpdate[0].visited);
  };

  useEffect(() => {
    fetchData();
  }, []);

  function dateChangeHandler(value) {
    setDate(value);
    console.log(date.format("D/MM/YYYY, h:mm a"));
  }

  return (
    <>
      {peaksList.map((peak) => (
        <Peak
          date={date}
          dateChangeHandler={dateChangeHandler}
          key={peak.id}
          peak={peak}
          handleSubmit={handleSubmit}
          expanded={expanded}
          setExpanded={setExpanded}
        />
      ))}
    </>
  );
};

export default Dashboard;
