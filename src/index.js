import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './views/Login/Login';
import Signup from './views/SignUp/Signup';
import Start from './views/Start/Start';
import Info from './views/CryptoInfo/CryptoInfo';
import Settings from './views/Settings/Settings';
import Delete from './views/DeleteAccount/DeleteAccount';
import Change from './views/ChangePassword/ChangePassword';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />,
    errorElement: <div>404</div>
  },
  {
    path: '/api/auth/authenticate',
    element: <Login />,
    errorElement: <Start />
  },
  {
    path: '/api/auth/register',
    element: <Signup />,
    errorElement: <Start />
  },
  {
    path: '/info/:id',
    element: <Info />,
    errorElement: <Start />
  },
  {
    path: '/settings',
    element: <Settings />,
    errorElement: <Start />
  },
  {
    path: '/delete',
    element: <Delete />,
    errorElement: <Start />
  },
  {
    path: '/change',
    element: <Change />,
    errorElement: <Start />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);