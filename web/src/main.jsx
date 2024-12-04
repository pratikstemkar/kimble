import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <div className="flex flex-col justify-between h-screen">
                <div>
                    <NavBar />
                    <App />
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    </StrictMode>
);
