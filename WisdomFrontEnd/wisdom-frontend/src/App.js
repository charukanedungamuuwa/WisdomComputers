import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import NavBar from "./Common/NavBar";
import Footer from "./Common/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ServicesList from "./Pages/ServicesList";
import MyAccount from "./Pages/MyAccount";
import RepairPage from "./Pages/RepairPage";
import Suppliers from "./Pages/Suppliers";
import HomePage from "./Pages/HomePage";
import Employees from "./Pages/Employees";
import AdminDashboard from "./Pages/AdminDashboard";
import ProtectedRoute from "./Pages/ProtectedRoute";


function App() {
  return (
      <div className="flex flex-col min-h-screen">
          <BrowserRouter>
              <div><NavBar/></div>



              <div className="container mx-auto flex-grow mt-4">

                  <Routes>
                      <Route path="/services" element={<ServicesList />}/>
                      <Route path="/about" element={<div>About Us Page</div>}/>
                      {/*<Route path="/my-repairs" element={<div>My Repairs Page</div>}/>*/}
                      <Route path="/purchase-options" element={<div>Purchase Options Page</div>}/>
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/my-repairs" element={<RepairPage />} />
                      <Route path="/my-account" element={<MyAccount />} />
                      {/*<Route path="/my-account" element={<MyAccount />} />*/}
                      <Route path="/suppliers" element={<Suppliers />}/>
                      <Route path="/employees" element={<Employees />} />
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="/homepage" element={<HomePage />} />
                      <Route path="/test" element={<test />} />
                      <Route
                          path="/admin-dashboard"
                          element={
                              <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                                  <AdminDashboard />
                              </ProtectedRoute>
                          }
                      />
                      {/*<Route*/}
                      {/*    path="/supplier-dashboard"*/}
                      {/*    element={*/}
                      {/*        <ProtectedRoute allowedRoles={['ROLE_SUPPLIER']}>*/}
                      {/*            <Suppliers />*/}
                      {/*        </ProtectedRoute>*/}
                      {/*    }*/}
                      {/*/>*/}
                      {/*<Route*/}
                      {/*    path="/user-dashboard"*/}
                      {/*    element={*/}
                      {/*        <ProtectedRoute allowedRoles={['ROLE_USER']}>*/}
                      {/*            <MyAccount />*/}
                      {/*        </ProtectedRoute>*/}
                      {/*    }*/}
                      {/*/>*/}



                  </Routes>
              </div>

              <Footer/>

          </BrowserRouter>
      </div>

  );
}

export default App;
