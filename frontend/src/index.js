import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // ✅ This is where Tailwind gets pulled in

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
