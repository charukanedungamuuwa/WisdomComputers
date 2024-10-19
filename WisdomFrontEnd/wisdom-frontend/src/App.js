import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import NavBar from "./Common/NavBar";
import Footer from "./Common/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ServicesList from "./Pages/ServicesList";
import MyRepairs from "./Pages/MyRepairs";
import MyAccount from "./Pages/MyAccount";

function App() {
  return (
      <div className="flex flex-col min-h-screen">
          <BrowserRouter>
              <NavBar/>
              <div className="container mx-auto flex-grow mt-4">
                  <Routes>
                      <Route path="/services" element={<ServicesList />}/>
                      <Route path="/about" element={<div>About Us Page</div>}/>
                      {/*<Route path="/my-repairs" element={<div>My Repairs Page</div>}/>*/}
                      <Route path="/purchase-options" element={<div>Purchase Options Page</div>}/>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/my-repairs" element={<MyRepairs />} />
                      <Route path="/my-account" element={<MyAccount />} />


                  </Routes>
              </div>

              <Footer/>

          </BrowserRouter>
      </div>

  );
}

export default App;
