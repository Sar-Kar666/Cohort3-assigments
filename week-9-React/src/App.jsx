import { useState } from "react";


function App() {
  return (<div>
    
    <Display/>
    </div>
  
)
}
function Display(){
 const [count,setCount]=useState(0);


 function increaseCounter(){
  setCount(count+1);

  }



  function decreaseCounter(){
  setCount(count-1);

  }


  return (
  <div>
   <h1>{count}</h1>
  <button onClick={increaseCounter}>Increase count </button>
  <button onClick={decreaseCounter}>Decrease count </button>
  </div>
  )
}



export default App
