import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import FacultyDashboard from "./pages/FacultyDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import RequireAuth from "./components/RequireAuth";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
          path="/faculty-dashboard"
          element={
            <RequireAuth>
              <FacultyDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/staff-dashboard"
          element={
            <RequireAuth>
              <StaffDashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/student-dashboard"
          element={
            <RequireAuth>
              <StudentDashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
