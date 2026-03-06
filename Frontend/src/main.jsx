import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Footer from './composants/footer.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Footer />
  </React.StrictMode>
);