import { useEffect, useRef, useState } from "react"

function usePrev(value){
  const ref=useRef();

  useEffect(()=>{
    ref.current=value;
  },[value])

  return ref.current;
}
function App() {
  const [value,setValue]=useState(0);

  const output=usePrev(value);


  function increase(){
    setValue(c=>c+1)
  }

  
  return<div>
    {value}
    <br/>
    <button onClick={increase}>Increase</button>
    <div>The value is  {output}</div>
  </div>
}




export default App
