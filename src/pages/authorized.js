import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TeacherDashboard } from "./teacherDashboard";
import { TAssignmentPage } from "./TAssignmentPage";

function Authorized() {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setId(localStorage.getItem("id"));
    setUserType(localStorage.getItem("userType"));
    if(token==null) {
        navigate("/unauthorized");
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        {token == null ? (
          <Routes>
            <Route path="/" element={<Navigate to="./" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/teacher-dashboard" />} />
            <Route path="teacher-dashboard" element={<TeacherDashboard />} />
            <Route
              path="teacher-dashboard/assignments/:id"
              element={<TAssignmentPage />}
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default Authorized;
