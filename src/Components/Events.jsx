import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CommonContext } from "../contextAPI";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Card, CardContent, IconButton, Typography } from "@mui/material";


const Events = () => {
  const {
    data: { eventsData, selectedDate},
    setData,
  } = CommonContext();


  const rows = [
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "1 PM",
    "2 PM",
    "3 PM",
    "4 PM",
    "5 PM",
    "6 PM",
    "7 PM",
    "8 PM",
    "9 PM",
    "10 PM",
    "11 PM",
    "12 AM",
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
  ];

  const handleDelete = (id) => {
    const storedData = new Set(JSON.parse(localStorage.getItem("deleteData")) || []);
    storedData.push(id);
    localStorage.setItem("deleteData", JSON.stringify(storedData));

    const updatedEvents = eventsData.filter((item) => item.id !== id);
    setData((prevData) => ({ ...prevData, eventsData: updatedEvents }));

    const storedEventData = JSON.parse(localStorage.getItem("newData")) || [];
    const newEventArray = storedEventData.filter((item) => item.id !== id);
    localStorage.setItem("newData", JSON.stringify(newEventArray));
  };

  const getTime = (date) => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
  };

  const timingData = (row) => {
    const timing = row.split(" ");
    const hour = parseInt(timing[0], 10);
    const PM = timing[1] === "PM";

    let hourIn24 = hour;
    if (PM && hour !== 12) {
      hourIn24 += 12;
    } else if (!PM && hour === 12) {
      hourIn24 = 0;
    }
    const dateOfTable = new Date(selectedDate);
    dateOfTable.setHours(hourIn24);

    const timingEvents = eventsData.filter((item) => {
      const eventDate = new Date(item.startTime);

      return (
        eventDate.getHours() === dateOfTable.getHours() &&
        eventDate.getDate() === dateOfTable.getDate() &&
        eventDate.getMonth() === dateOfTable.getMonth() &&
        eventDate.getFullYear() === dateOfTable.getFullYear()
      );
    });

    return timingEvents;
  };

  return (
    <div className="events">
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow className="t-head">
                <TableCell align="center" sx={{width:"50px"}}>Time</TableCell>
                <TableCell align="center">Events</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, idx) => {
                const timingEvents = timingData(row);
                return (
                  <TableRow
                    key={idx}
                    className="t-row"
                  >
                    <TableCell align="center">{row}</TableCell>
                    <TableCell align="center" sx={{display:"flex",justifyContent:"center",overflowX:"auto",gap:"1rem",height:120}}>
                      {timingEvents.map((item, idx) => {
                        const startTime = new Date(item.startTime);
                        const endTime = new Date(item.endTime);
                        const formattedTimeOfStart = getTime(startTime);
                        const formattedTimeOfEnd = getTime(endTime);

                        return (
                          <Card key={idx} sx={{ width:200,boxShadow:"inset 0 0 10px gray"}}>
                            <Typography component="div" align="right">
                              <IconButton
                                onClick={() => {
                                  setData((prev)=>({
                                    ...prev,
                                    clicked : true,
                                    id:item.id
                                  }))
                                  
                                }}
                              >
                                <EditIcon color="secondary" />
                              </IconButton>
                              <IconButton onClick={() => handleDelete(item.id)}>
                                <DeleteIcon color="error" />
                              </IconButton>
                            </Typography>
                            <CardContent>
                              <Typography
                                style={{ color: "green", textAlign: "center" }}
                              >
                                {item.title}
                              </Typography>
                              <Typography
                                style={{
                                  textAlign: "center",
                                  fontSize: "calc(15px + 0.2vw)",
                                }}
                              >{`${formattedTimeOfStart} - ${formattedTimeOfEnd}`}</Typography>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
    </div>
  );
};

export default Events;
