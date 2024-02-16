import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './assets/styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from './components/Loader';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const CreateBlog = lazy(() => import('./pages/CreateBlog'));

function App() {
  const loaderStyling = {
    width: '120px',
    height: '120px',
    dispplay: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader animation={'border'} variant={'primary'} />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/create-blog' element={<CreateBlog />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App;
