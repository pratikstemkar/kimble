import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
    return (
        <Routes>
            <Route
                index
                element={<Home />}
            />
            <Route
                path="login"
                element={<Login />}
            />
            <Route
                path="register"
                element={<Register />}
            />
        </Routes>
    );
}

export default App;
