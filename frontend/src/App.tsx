import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import ChannelsList from "./pages/ChannelsList";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/channels" element={<ChannelsList />} />
          {/* Future: <Route path="/channels" element={<ProtectedRoute><ChannelsList /></ProtectedRoute>} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
