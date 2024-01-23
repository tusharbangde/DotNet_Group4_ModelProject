
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login } from './pages/login';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Signup } from './pages/signup';
import { TeacherDashboard } from './pages/teacherDashboard';

function App() {

  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/" element={<Navigate to="/login" />}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
