import { useState ,useEffect} from "react";


function App() {

  const [currentTab,setCurrentTab]=useState("Home");
  
  
  return <div>
    <button onClick={()=>setCurrentTab(c=>"Home")} style={{color: currentTab=="Home" ?"red" : "black" }}>Home</button>
    <button onClick={()=>setCurrentTab(c=>"Notification")} style={{color: currentTab=="Notification" ?"red" : "black"}}>Notification</button>
    <button onClick={()=>setCurrentTab(c=>"messages")} style={{color : currentTab=="messages" ?"red" : "black"}}>messages</button>
    <button onClick={()=>setCurrentTab(c=>"jobs")} style={{color: currentTab=="jobs" ?"red":"black"}}>jobs</button>
  </div>
}




export default App
