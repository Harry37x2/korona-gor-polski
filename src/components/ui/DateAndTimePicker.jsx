import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const DateAndTimePicker = (props) => {
  function onChangeDateHandler(date) {
    props.onChange(date);
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="Data Zdobycia"
          value={props.date}
          onChange={onChangeDateHandler}
        />
      </LocalizationProvider>
    </>
  );
};

export default DateAndTimePicker;
