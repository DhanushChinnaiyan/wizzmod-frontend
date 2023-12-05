import React, { createContext, useContext, useState } from "react";
import dayjs from "dayjs";
import eventsData from "./data";

const context = createContext();
export const CommonContext = () => useContext(context);

const ContextProvider = ({ children }) => {
  const storedData = JSON.parse(localStorage.getItem("newData")) || [];
  const storedDeletedData = JSON.parse(localStorage.getItem("deleteData")) || [];
  const newData = eventsData.filter((item) => !storedDeletedData.includes(item.id))
  const [data, setData] = useState({
    eventsData: [...newData, ...storedData],
    selectedDate: dayjs(new Date()),
    clicked:false,
    id:""
  });
  const [formData, setFormData] = useState({
    title: "",
    startTime: dayjs(new Date()),
    endTime: dayjs(new Date()),
  });

  const getEventValues = (newValue) => {
    const selectedDate = new Date(data.selectedDate);
    const eventValues = data.eventsData.filter((item) => {
      const eventDate = new Date(item.startTime);
      return (
        eventDate.getFullYear() === selectedDate.getFullYear() &&
        eventDate.getMonth() === selectedDate.getMonth() &&
        eventDate.getDate() === selectedDate.getDate()
      );
    });

    setData((prev) => ({
      ...prev,
      eventValues,
      selectedDate: newValue ? dayjs(newValue) : dayjs(new Date()),
    }));

    setFormData({
      ...formData,
      startTime: newValue ? dayjs(newValue) : dayjs(new Date()),
      endTime: newValue ? dayjs(newValue) : dayjs(new Date()),
    });
  };

  const value = {
    data,
    setData,
    getEventValues,
    formData,
    setFormData,
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export default ContextProvider;
