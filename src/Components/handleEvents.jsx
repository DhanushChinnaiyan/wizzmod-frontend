import React, { useState } from "react";
import { CommonContext } from "../contextAPI";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Button, TextField } from "@mui/material";

const HandleEvents = () => {
  const { data, setData, formData, setFormData } = CommonContext();
  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      id: data.eventsData.length + 1,
      startTime: new Date(formData.startTime).toString(),
      endTime: new Date(formData.endTime).toString(),
    };
    console.log(newData);
    setData((prev) => ({
      ...prev,
      eventsData: [...prev.eventsData, newData],
    }));

    const storedData = localStorage.getItem("newData");
    let newArray = [];

    if (storedData) {
      newArray = JSON.parse(storedData);
      console.log(newArray)
    }
    newArray.push(newData);

    localStorage.setItem("newData", JSON.stringify(newArray));
  };
  return (
    <div className="add-event">
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Add title"
          required
          variant="outlined"
          value={formData.title}
          onChange={(event) =>
            setFormData({ ...formData, title: event.target.value })
          }
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["MobileTimePicker", "MobileTimePicker"]}>
            <DemoItem label="Start Time :">
              <MobileTimePicker
                value={formData.startTime}
                onChange={(newValue) => {
                  setFormData({ ...formData, startTime: newValue });
                }}
              />
            </DemoItem>
            <DemoItem label="End Time :">
              <MobileTimePicker
                value={formData.endTime}
                onChange={(newValue) => {
                  setFormData({ ...formData, endTime: newValue });
                }}
              />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
        <Button variant="contained" color="success" type="submit">
          Add New Event
        </Button>
      </form>
    </div>
  );
};

export default HandleEvents;
