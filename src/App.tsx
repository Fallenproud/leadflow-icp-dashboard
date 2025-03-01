
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LeadAutomationAndIcpConfiguration from "./pages/LeadAutomationAndIcpConfiguration";
import Documentation from "./pages/Documentation";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/lead-automation-and-icp-configuration" element={<LeadAutomationAndIcpConfiguration />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
