import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import * as UserHome from "./User/Home.jsx";
import * as UserDashboard from "./User/Dashboard.jsx";
import * as OfficerHome from "./TrafficOfficer/Home.jsx";
import * as OfficerDashboard from "./TrafficOfficer/DashBoard.jsx";
import * as OfficerChallanStatus from "./TrafficOfficer/ChallanStatus.jsx";
import * as AdminHome from "./Admin/Home.jsx"
import * as AdminDashboard from "./Admin/Dashboard.jsx"
import * as AdminChallanStatus from "./Admin/ChallanStatus.jsx";
import { CallanForm } from "./TrafficOfficer/ChallanForm.jsx";
import ComplaintForm from "./User/ComplaintForm.jsx";
import SignUp from "./SignUp.jsx";
import Login from "./Login.jsx";
import PublicRoute from "./routes/PublicRoute.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import ComplaintStatus from "./User/ComplaintStatus.jsx";
import { Challan } from "./User/Challan.jsx";
import UserList from "./Admin/UserList.jsx";
import Complaint from './Admin/Complaint.jsx'
import OfficerList from "./Admin/OfficerList.jsx";
import CreateOfficer from "./Admin/CreateOfficer.jsx";
import AssignedComplaints from "./TrafficOfficer/AssignedComplaints.jsx";
import PaymentSuccessPage from "./PaymentSuccessPage.jsx";
import PaymentFailedPage from "./PaymentFailedPage.jsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <PublicRoute><SignUp /></PublicRoute>
  },
  {
    path: "/login",
    element: <PublicRoute> <Login /></PublicRoute>
  },
  {    
    path:"paymentSuccess",
    element:<PaymentSuccessPage/>
  },
  {
    path:"paymentFailed",
    element:<PaymentFailedPage/>
  },

  {
    path: "user",
    element: <UserHome.Home />,
    children: [
      {
        path: "dashboard",
        element: <ProtectedRoute><UserDashboard.Dashboard /></ProtectedRoute>
      },
      {
        path: "complaint",
        element: <ProtectedRoute> <ComplaintForm /> </ProtectedRoute>
      },
      {
        path: "complaint-status",
        element: <ProtectedRoute> <ComplaintStatus /> </ProtectedRoute>
      },
      {
        path: "challan",
        element: <ProtectedRoute><Challan /> </ProtectedRoute>
      },
    ]
  },
  {
    path: "officer",
    element: <OfficerHome.Home />,
    children: [
      {
        path: "dashboard",
        element: <ProtectedRoute><OfficerDashboard.Dashboard /></ProtectedRoute>
      },
      {
        path: "challan-status",
        element: <ProtectedRoute><OfficerChallanStatus.ChallanStatus /></ProtectedRoute>
      },
      {
        path: "e-challan",
        element: <ProtectedRoute> <CallanForm /></ProtectedRoute>
      },
      {
        path: "assigned-complaints",
        element: <ProtectedRoute> <AssignedComplaints /></ProtectedRoute>
      }
    ]
  },
  {
    path: "admin",
    element: <AdminHome.Home />,
    children: [
      {
        path: "dashboard",
        element: <ProtectedRoute> <AdminDashboard.Dashboard /> </ProtectedRoute>
      },
      {
        path: "complaint",
        element: <ProtectedRoute> <Complaint /> </ProtectedRoute>
      },
      {
        path: "challan-status",
        element: <ProtectedRoute><AdminChallanStatus.ChallanStatus /></ProtectedRoute>
      },
      {
        path: "users",
        element: <ProtectedRoute> <UserList /> </ProtectedRoute>
      },
      {
        path: "officers",
        element: <ProtectedRoute> <OfficerList /> </ProtectedRoute>
      },
      {
        path: "create-officer",
        element: <ProtectedRoute> <CreateOfficer /> </ProtectedRoute>
      },
    ]
  },
]);