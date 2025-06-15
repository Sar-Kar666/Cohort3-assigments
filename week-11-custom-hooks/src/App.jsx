import { useState } from "react"

function useCounter(){
  const [count,setCount]=useState(0);

  function increaseCount(){
    setCount(c=>c+1)
  }

  return{
    count:count,
    increaseCount: increaseCount
  }
}

function App() {
  const {count,increaseCount}=useCounter();
  return <div >
    <Counter/>
    <Counter/>
    <Counter/>
    <Counter/>
  </div>
}

function Counter(){
  const {count,increaseCount}=useCounter();
   return <div >
    {count }<br/>
    <button onClick={increaseCount}>Increase Count</button>
  </div>
}

export default App
