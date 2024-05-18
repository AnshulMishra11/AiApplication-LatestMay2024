import { Routes,Route, BrowserRouter } from "react-router-dom";
import Chat from "./components/Chat";
import CameraScan from "./components/CameraScan";

function App() {
  
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Chat/>}/>
        <Route path='/camera' element={<CameraScan/>}/>
            
      </Routes>

    

    </BrowserRouter>
  )
  

}

export default App;
