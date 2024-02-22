import "bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./pages/login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Signup } from "./pages/signup";
import { TeacherDashboard } from "./pages/teacherDashboard";
import { TAssignmentPage } from "./pages/TAssignmentPage";
import { useEffect, useState } from "react";
import { NewAssignment } from "./pages/NewAssignment";
import { Studentdashboard } from "./pages/studentDashboard";
import { StudentUpload } from "./pages/StudentUpload";

function App() {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setId(localStorage.getItem("id"));
    setUserType(localStorage.getItem("userType"));
    console.log(userType)
  }, [localStorage.getItem("token")]);

  return (
    <div className="App">
      <BrowserRouter>
        {/* <Routes>
          <Route path="student-dashboard" element={<Studentdashboard />} />
        </Routes> */}
        {token == null ? (
          <Routes>
            <Route path="*" element={<Navigate to="/unauthorized" />} />
            <Route path="/" element={<Navigate to="/unauthorized" />} />
            <Route
              path="/unauthorized"
              element={<Navigate to="/unauthorized/login" />}
            />
            <Route path="unauthorized/login" element={<Login />} />
            <Route path="unauthorized/signup" element={<Signup />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="*" element={<Navigate to="/auth" />} />
            <Route path="/" element={<Navigate to="/auth" />} />
            <Route
              path="auth/teacher-dashboard"
              element={<TeacherDashboard />}
            />
            <Route
              path="auth/student-dashboard"
              element={<Studentdashboard />}
            />
            <Route
              path="auth/teacher-dashboard/new-assignment"
              element={<NewAssignment />}
            />
            <Route
              path="auth/teacher-dashboard/assignments/:id"
              element={<TAssignmentPage />}
            />
            <Route
              path="auth/student-dashboard/assignments/:id"
              element={<StudentUpload />}
            />
            {localStorage.getItem("userType") == "Teacher" ? (
              <Route
                path="/auth"
                element={<Navigate to="/auth/teacher-dashboard" />}
              />
            ) : (
              ""
            )}
            {/* {localStorage.getItem("userType") == "Student" ? ( */}
              <Route
                path="/auth"
                element={<Navigate to="/auth/student-dashboard" />}
              />
            {/* ) : ( */}
              {/* "item not found" */}
            {/* )} */}
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
