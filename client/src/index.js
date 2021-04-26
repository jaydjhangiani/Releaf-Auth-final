import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { PodContextProvider } from "./context/PodContext";

ReactDOM.render(
  <AuthContextProvider>
    <PodContextProvider>
      <App />
    </PodContextProvider>
  </AuthContextProvider>,

  document.getElementById("root")
);
