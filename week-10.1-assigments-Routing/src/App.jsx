
import { useState,useRef } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {
const [currentCount,setCurrentCount]=useState(0);
console.log("count is"+currentCount)
const timer=useRef();


function startClock(){
  let value= setInterval(function(){
    setCurrentCount(c=>c+1);

  },1000);
  timer.current=value;
}


function stopClock(){
  clearInterval(timer.current);
  console.log("timer is "+timer.current);
}


  return <div>
    {currentCount}
    <br/>
    <button onClick={startClock}>Start</button>
      <button onClick={stopClock}>Stop</button>
  </div>
}

export default App
