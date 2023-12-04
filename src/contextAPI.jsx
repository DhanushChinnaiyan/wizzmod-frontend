import React, { createContext, useContext, useState } from "react";
import dayjs from "dayjs";
import eventsData from "./data";

const context = createContext();
export const CommonContext = () => useContext(context);

const ContextProvider = ({ children }) => {
  const storedData = localStorage.getItem("newData");
  let newArray = [];
  if (storedData) {
    newArray = JSON.parse(storedData);
  }

  const [data, setData] = useState({
    eventsData,
    eventsData: [...eventsData, ...newArray],
    selectedDate: dayjs(new Date()),
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
