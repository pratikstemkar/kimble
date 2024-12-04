import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import store from "../store/store.js";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="flex flex-col justify-between h-screen">
                <div>
                    <NavBar />
                    <App />
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    </Provider>
);
