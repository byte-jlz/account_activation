import { Routes, Route } from "react-router"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AuthLayout from "./pages/Layouts/AuthLayout"
import ProtectedLayout from "./pages/Layouts/ProtectedLayout"
import Profile from "./pages/Profile"
import Activate from "./pages/Activate"



function App() {

  return (
    <Routes>
      <Route element={<ProtectedLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="Profile" element={<Profile />} />
        
      </Route>

      <Route path="register" element={<Register />} />

      <Route element={<AuthLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
      </Route>
      
      <Route path="/activate/:uid/:token" element={<Activate />} />

      
    </Routes>
  )
}

export default App
