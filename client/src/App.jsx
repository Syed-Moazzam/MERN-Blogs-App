import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import SingleBlog from './pages/SingleBlog';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';

import './assets/styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Lazy Loaded Compoenents
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const CreateBlog = lazy(() => import('./pages/CreateBlog'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

function App() {
  const loaderStyle = {
    width: '60px',
    height: '60px',
    borderWidth: '6px'
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:blogId' element={<SingleBlog />} />

        <Route path='/about' element={
          <Suspense fallback={<Loader customStyles={loaderStyle} />}>
            <About />
          </Suspense>
        } />
        <Route path='/contact' element={
          <Suspense fallback={<Loader customStyles={loaderStyle} />}>
            <ProtectedRoute path={'/contact'} component={Contact} />
          </Suspense>
        } />
        <Route path='/create-blog' element={
          <Suspense fallback={<Loader customStyles={loaderStyle} />}>
            <ProtectedRoute path={'/create-blog'} component={CreateBlog} />
          </Suspense>
        } />
        <Route path='/user-profile' element={
          <Suspense fallback={<Loader customStyles={loaderStyle} />}>
            <ProtectedRoute path={'/user-profile'} component={UserProfile} />
          </Suspense>
        } />
        <Route path='/login' element={
          <Suspense fallback={<Loader customStyles={loaderStyle} />}>
            <ProtectedRoute path={'/login'} component={Login} />
          </Suspense>
        } />
        <Route path='/signup' element={
          <Suspense fallback={<Loader customStyles={loaderStyle} />}>
            <ProtectedRoute path={'/signup'} component={Signup} />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
