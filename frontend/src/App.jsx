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

      <Route element={<AuthLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      
      <Route path="/activate/:uid/:token" element={<Activate />} />

      
    </Routes>
  )
}

export default App
