import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./pages/login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./pages/signup";
import { TeacherDashboard } from "./pages/teacherDashboard";
import { TAssignmentPage } from "./pages/TAssignmentPage";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setId(localStorage.getItem("id"));
    setUserType(localStorage.getItem("userType"));
  }, [localStorage.getItem("token")]);

  return (
    <div className="App">
        <BrowserRouter>
        {token == null ? (
          <Routes>
            <Route path="*" element={<Navigate to="/unauthorized" />} />
            <Route path="/" element={<Navigate to="/unauthorized" />} />
            <Route path="/unauthorized" element={<Navigate to="/unauthorized/login" />} />
            <Route path="unauthorized/login" element={<Login />} />
            <Route path="unauthorized/signup" element={<Signup />}/>
          </Routes>
        ) : (
          <Routes>
            <Route path="*" element={<Navigate to="/auth" />} />
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route path="/auth" element={<Navigate to="/auth/teacher-dashboard" />} />
            <Route path="auth/teacher-dashboard" element={<TeacherDashboard />} />
            <Route
              path="auth/teacher-dashboard/assignments/:id"
              element={<TAssignmentPage />}
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
