import './App.css'
import { RecoilRoot,atom, useRecoilValue } from 'recoil'
import { networkAtom } from './atoms'


function App() {
 return<RecoilRoot>
  <MainApp/>
 </RecoilRoot>
}

function MainApp(){
 const networkNotificationCount= useRecoilValue(networkAtom)


  return (
   <>
   
      <button>Home</button>

      <button>My network</button>
      <button>Jobs</button>
      <button>Messaging</button>
      <button>Notification</button>

      <button>Me</button>
    
   </>
  )
}



export default App