
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LeadAutomationAndIcpConfiguration from "./pages/LeadAutomationAndIcpConfiguration";
import Documentation from "./pages/Documentation";
import GettingStarted from "./pages/docs/GettingStarted";
import ICPConfiguration from "./pages/docs/ICPConfiguration";
import LeadAutomation from "./pages/docs/LeadAutomation";
import ApiReference from "./pages/docs/ApiReference";
import ApiDocumentation from "./pages/docs/ApiDocumentation";
import DeveloperSupport from "./pages/docs/DeveloperSupport";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/lead-automation-and-icp-configuration" element={<LeadAutomationAndIcpConfiguration />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/docs/getting-started" element={<GettingStarted />} />
        <Route path="/docs/icp-configuration" element={<ICPConfiguration />} />
        <Route path="/docs/lead-automation" element={<LeadAutomation />} />
        <Route path="/docs/api-reference" element={<ApiReference />} />
        <Route path="/docs/api-documentation" element={<ApiDocumentation />} />
        <Route path="/docs/developer-support" element={<DeveloperSupport />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
