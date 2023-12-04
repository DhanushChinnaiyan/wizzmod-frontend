import React, { useState } from 'react'
import { CommonContext } from '../contextAPI'
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import HandleEvents from './handleEvents';



const Calander = () => {
    const {data,setData,getEventValues} = CommonContext()
    const handleChange = (newValue) => {
      getEventValues(newValue)
    }

  return (
    <div className='calender'>
      <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer components={['DateCalendar']}>
        <DemoItem >
          <DateCalendar  value={data.selectedDate} onChange={handleChange} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
    <HandleEvents/>
    </div>
  )
}

export default Calander