import { createContext, useContext, useState } from "react"

const BulbContex= createContext();


function BulbProvider({children}){
  const [bulbOn,setBulbOn]=useState(true);  

  return <BulbContex.Provider value={{
        bulbOn: bulbOn,
        setBulbOn:setBulbOn
      }}>

        {children}
      </BulbContex.Provider>
}

function App() {
  
  
  return (
    <div>
      <BulbProvider>
      <LightBulb/>
    </BulbProvider>
      
    </div>
  )
}


function LightBulb(){

  return <div>
    <BulbState />
    <ToggleBulbState/>
  </div>
}

function BulbState(){
  const {bulbOn}=useContext(BulbContex);
  return <div>
    {bulbOn? "Bulb on": "Bulb Off"}
  </div>
}

function ToggleBulbState(){
 const {bulbOn,setBulbOn}=useContext(BulbContex);
  function toggle(){
     setBulbOn(!bulbOn)
  }
  return <div>
    <button onClick={toggle}>Toggle the bulb</button>
  </div>
}


export default App
