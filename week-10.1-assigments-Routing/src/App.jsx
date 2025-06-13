
import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {
  return<div>
    ALLEN | CLASS11 | CLASS 12
      <BrowserRouter>
        <Routes>
          <Route path="/neet/online-coaching-class-11" element={<Class11Program/>}/>
          <Route path="/neet/online-coaching-class-12" element={<Class12Program/>}/>
          <Route path="/" element={<Landing/>}/>
        </Routes>
      </BrowserRouter>
    </div>
}

function Landing (){

  return <div>
   Welcome
  </div>
}


function Class11Program(){

  return <div>
    NEET programs for class 11
  </div>
}


function Class12Program(){

  return <div>
    NEET programs for class 12
  </div>
}

export default App
