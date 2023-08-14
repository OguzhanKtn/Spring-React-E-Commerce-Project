import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './pages_user/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Register from './pages_user/Register';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages_user/Profile';
import Control from './Control';
import Dashboard from './pages_admin/Dashboard';
import Home from './components/Home';
import Detail from './pages_user/Detail';
import Category from './pages_user/Category';
import CategoryManager from './pages_admin/CategoryManager';
import Basket from './pages_user/Basket';

const router = 
<BrowserRouter>
<ToastContainer position='top-center' transition={Flip} autoClose={1000} />
<Routes>
  <Route path='/login' element={<Login/>} />
  <Route path='/category/:id' element={<Category/>}/>
  <Route path='/categorymanager' element={<Control item={<CategoryManager/>} />}/>
  <Route path='/' element={<Home/>} />
  <Route path='/register' element={<Register/>} />
  <Route path='/profile' element={<Control item = {<Profile/>} />} />
  <Route path='/basket' element={<Control item = {<Basket/>} />} />
  <Route path='/dashboard' element={<Control item = {<Dashboard/>} />} />
  <Route path='/detail/:id' element={<Detail/>} />
</Routes>

</BrowserRouter>

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
 router
);

