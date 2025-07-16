import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import PromptForm from "./PromptForm";
import Docs from "./pages/Docs"; // Make sure Docs.jsx is inside /src/pages
import ErrorCheckCard from './components/ErrorCheckCard';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AuthProvider } from "./context/AuthContext";
import Features from "./pages/Features";
import PromptHistory from "./components/PromptHistory";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route
          path="/"
          element={
            <>
              <LandingPage />
              <section id="prompt" className="bg-slate-900 py-24 px-4">
               
              </section>
            </>
          }
        />
	<Route path="/features" element={<Features />} />
	
        {/* Docs Route */}
        <Route path="/docs" element={<Docs />} />
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/history" element={<PromptHistory />} />

      </Routes>
    </Router>
  );
}

export default App;