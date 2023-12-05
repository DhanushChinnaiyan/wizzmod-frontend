import "./App.css";
import React, { useEffect } from "react";
import Calander from "./Components/Calander";
import Events from "./Components/Events";
import { CommonContext } from "./contextAPI";
import HandleEvents from "./Components/handleEvents";

function App() {
  const {
    data: { clicked },
    getEventValues,
  } = CommonContext();
  useEffect(() => {
    getEventValues();
  }, []);

  return (
    <div className="App">
      {clicked ? (
        <HandleEvents editType={true} />
      ) : (
        <>
          <Calander />
          <Events />
        </>
      )}
    </div>
  );
}

export default App;
