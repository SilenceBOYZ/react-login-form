import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthenticateProvider } from "./context/AuthenticateContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthenticateProvider>
      <App />
    </AuthenticateProvider>
  </StrictMode>
);
