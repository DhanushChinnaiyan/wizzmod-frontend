import React, { useEffect } from "react";
import { CommonContext } from "../contextAPI";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import dayjs from "dayjs";

const HandleEvents = ({ editType }) => {
  const {
    data: { eventsData, id },
    setData,
    formData,
    setFormData,
  } = CommonContext();
  useEffect(() => {
    if (editType) {
      const newFormData = eventsData.find((item) => item.id === id);
      console.log(eventsData);
      setFormData({
        ...formData,
        title: newFormData.title,
        startTime: dayjs(newFormData.startTime),
        endTime: dayjs(newFormData.endTime),
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedDeletedData =
      JSON.parse(localStorage.getItem("deleteData")) || [];
    const id = eventsData.length + 1;

    while (storedDeletedData.includes(id)) {
      id++;
    }
    const newData = {
      id,
      title: formData.title,
      startTime: new Date(formData.startTime).toString(),
      endTime: new Date(formData.endTime).toString(),
    };

    setData((prev) => ({
      ...prev,
      eventsData: [...prev.eventsData, newData],
    }));

    const storedData = localStorage.getItem("newData");
    let newArray = [];

    if (storedData) {
      newArray = JSON.parse(storedData);
      console.log(newArray);
    }
    newArray.push(newData);

    localStorage.setItem("newData", JSON.stringify(newArray));
  };

  const handleEdit = (e) => {
    e.preventDefault();
  
    const findedIndex = eventsData.findIndex((item) => item.id === id);

    const updatedEventData = [...eventsData];
    updatedEventData[findedIndex] = {
      ...updatedEventData[findedIndex],
      title: formData.title,
      startTime: new Date(formData.startTime).toString(),
      endTime: new Date(formData.endTime).toString(),
    };

    setData((prev) => ({
      ...prev,
      eventsData: updatedEventData,
    }));

    const storedData = localStorage.getItem("newData");
    let newArray = [];

    if (storedData) {
      newArray = JSON.parse(storedData);
      console.log(newArray);
    }
    const findedIndexForLocal = newArray.findIndex((item) => item.id === id);


    newArray[findedIndexForLocal] = {
      ...newArray[findedIndexForLocal],
      title: formData.title,
      startTime: new Date(formData.startTime).toString(),
      endTime: new Date(formData.endTime).toString(),
    };

    localStorage.setItem("newData", JSON.stringify(newArray));
 
    setData((prev)=>({
      ...prev,
      clicked:false
    }))
 
  };

  const className = editType? "add-event edit-event" : "add-event"
  return (
    <div className={className}>
      <form
        onSubmit={editType ? handleEdit : handleSubmit}
        style={
          editType ? { padding: "35px 15px 15px 15px" } : { padding: "15px" }
        }
      >
        {editType && (
          <Typography
            component="div"
            style={{ position: "absolute", top: 0, right: 0 }}
          >
            <IconButton
              onClick={() =>
                setData((prev) => ({
                  ...prev,
                  clicked: false,
                }))
              }
            >
              <ClearIcon color="error" />
            </IconButton>
          </Typography>
        )}
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
          {editType ? "Edit Event" : "Add New Event"}
        </Button>
      </form>
    </div>
  );
};

export default HandleEvents;
