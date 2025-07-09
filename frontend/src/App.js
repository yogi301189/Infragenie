import React from "react";
import LandingPage from "./LandingPage";
import PromptForm from "./PromptForm";

function App() {
  return (
    <>
      <LandingPage />
      <section id="prompt" className="bg-slate-900 py-24 px-4">
        <PromptForm />
      </section>
    </>
  );
}

export default App;
