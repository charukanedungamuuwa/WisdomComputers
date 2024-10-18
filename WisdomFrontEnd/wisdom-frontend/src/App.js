import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import {NavBar} from "./Common/NavBar";

function App() {
  return (
 <div>
     <BrowserRouter>
<Routes>
<Route path="/navbar" element={<NavBar/>}/>

</Routes>
     </BrowserRouter>
 </div>
  );
}

export default App;
