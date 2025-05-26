import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import { AuthProvider } from "./features/auth/AuthProvider";
import ChannelsList from "./features/channels/ChannelsList";

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
