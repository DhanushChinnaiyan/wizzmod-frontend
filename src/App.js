import './App.css';
import React, { useEffect } from 'react'
import eventsData from "./data";
import Calander from './Components/Calander';
import Events from './Components/Events';
import { CommonContext } from './contextAPI';

function App() {
  const {data,setData,getEventValues} = CommonContext()
  useEffect(()=>{
    

    getEventValues()
  },[])
  console.log(data)
  return (
    <div className="App">
      <Calander/>
      <Events/>
    
    </div>
  );
}

export default App;
