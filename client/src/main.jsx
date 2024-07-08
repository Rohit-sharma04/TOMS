import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import Navbar from './Components/Navbar.jsx'
import axios from 'axios'
import { UserProvider } from './Context/UserContext.jsx'


axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
// `withCredentials` indicates whether or not cross-site Access-Control requests
// should be made using credentials
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <Navbar />
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)

