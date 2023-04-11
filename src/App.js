import { Routes, Route, BrowserRouter } from 'react-router-dom';
import About from './Pages/About';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Contact from './Pages/Contact';
import Home from './Pages/Home';
import Policy from './Pages/Policy';
import { AuthProvider } from './context/auth';
import Dashborad from './Pages/User/Dashborad';
import Private from './Components/Routes/Private';
import ForgotPass from './Pages/Auth/ForgotPass';
import Spinner from './Components/Spinner';
import Admin from './Components/Routes/Admin';
import AdminPannel from './Pages/Admin/AdminPannel';
import Catagory from './Pages/Admin/Catagory';
import Product from './Pages/Admin/Product';
import Users from './Pages/Admin/Users';
import Profile from './Pages/User/Profile';
import Orders from './Pages/User/Orders';


function App() {
  return (
    <>{
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/forgot-password' element={<ForgotPass />} />
            <Route path='/policy' element={<Policy />} />
            <Route path='/dashborad' element={<Private />}>
              <Route path='user' element={<Dashborad />} />
              <Route path='user/profile' element={<Profile />} />
              <Route path='user/orders' element={<Orders />} />
            </Route>
            <Route path='/dashborad' element={<Admin />}>
              <Route path='admin' element={<AdminPannel />} />
              <Route path='admin/add-catagory' element={<Catagory />} />
              <Route path='admin/add-product' element={<Product />} />
              <Route path='admin/users' element={<Users />} />
            </Route>
            <Route path='*' element={<Spinner />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    }
    </>
  );
}

export default App;
