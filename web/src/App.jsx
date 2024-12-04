import { Route, Routes } from "react-router";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Stories from "./components/Stories/Stories";
import Profile from "./components/User/Profile";
import Write from "./components/Story/Write";

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
            <Route
                path="stories"
                element={<Stories />}
            />
            <Route
                path="users/:userId"
                element={<Profile />}
            />
            <Route
                path="write"
                element={<Write />}
            />
        </Routes>
    );
}

export default App;
