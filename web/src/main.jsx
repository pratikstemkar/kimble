import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store, persistor } from "../store/store.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { Loader2Icon } from "lucide-react";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
    <HelmetProvider>
        <Provider store={store}>
            <PersistGate
                loading={<Loader2Icon className="animate-spin" />}
                persistor={persistor}
            >
                <BrowserRouter>
                    <div className="flex flex-col justify-between h-screen">
                        <div>
                            <NavBar />
                            <App />
                        </div>
                        <ToastContainer />
                        <Footer />
                    </div>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </HelmetProvider>
);
