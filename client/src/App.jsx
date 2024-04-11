import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './assets/styles/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const CreateBlog = lazy(() => import('./pages/CreateBlog'));
const UserProfile = lazy(() => import('./pages/UserProfile'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader animation={'border'} variant={'primary'} />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<ProtectedRoute path={'/contact'} component={Contact} />} />
          <Route path='/create-blog' element={<ProtectedRoute path={'/create-blog'} component={CreateBlog} />} />
          <Route path='user-profile' element={<ProtectedRoute path={'user-profile'} component={UserProfile} />} />
          <Route path='/login' element={<ProtectedRoute path={'/login'} component={Login} />} />
          <Route path='/signup' element={<ProtectedRoute path={'/signup'} component={Signup} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App;
