import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Queue from "./components/Queue";
import JoinQueueForm from "./components/JoinQueueForm";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  // For simplicity, hardcode login ("user" or "admin")
  const [user, setUser] = useState(null); // { role: "admin" | "student", name, studentID }

  // A quick “auth” redirect wrapper
  const RequireAuth = ({children, role}) => {
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/" />;
    return children;
  };

  return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/" element={<Queue user={user} />} />
          <Route
              path="/join"
              element={
                <RequireAuth role="student">
                  <JoinQueueForm user={user} />
                </RequireAuth>
              }
          />
          <Route
              path="/admin"
              element={
                <RequireAuth role="admin">
                  <AdminDashboard user={user} />
                </RequireAuth>
              }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
  );
}

export default App;

