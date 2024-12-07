import { LogOutIcon, PencilIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, Link } from "react-router";
import { toast } from "react-toastify";
import { logout } from "../../store/features/userSlice";

const NavBar = () => {
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
        toast.success("Logged out successfully!", {
            position: "bottom-right",
        });
        navigate("/");
    };

    return (
        <nav className="px-20 py-4 flex justify-between items-center shadow-md">
            <div className="flex space-x-20 items-center">
                <Link
                    to="/"
                    className="text-4xl font-extrabold tracking-tighter"
                >
                    <div
                        className="flex space-x-2 items-center group"
                        title="Real stories by Real people"
                    >
                        <img
                            src="/logo.png"
                            className="h-10 w-10 group-hover:scale-110 transition duration-300 ease-in-out group-hover:shadow-lg rounded-full"
                        />
                        <span className="group-hover:text-red-500 transition duration-300 ease-in-out">
                            Kimble
                        </span>
                    </div>
                </Link>
                <div className="flex space-x-5 items-center">
                    <NavLink
                        to="stories"
                        className={({ isActive }) =>
                            isActive
                                ? "text-red-500 hover:text-red-500"
                                : "text-black hover:text-red-500"
                        }
                    >
                        Stories
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            isActive
                                ? "text-red-500 hover:text-red-500"
                                : "text-black hover:text-red-500"
                        }
                    >
                        About
                    </NavLink>{" "}
                    {/* {JSON.stringify(user)} */}
                </div>
            </div>
            <div className="flex space-x-2">
                {user ? (
                    <>
                        <Link
                            to="/write"
                            className="hover:cursor-pointer flex space-x-2 items-center bg-red-500 px-4 py-2 rounded-full text-white hover:shadow-md"
                        >
                            <PencilIcon className="h-4 w-4" />
                            <span>Write Story</span>
                        </Link>
                        <Link
                            to={`/users/${user.id}`}
                            className="hover:cursor-pointer ring-red-500 rounded-full text-white hover:shadow-md"
                        >
                            <img
                                src={user.pfp}
                                className="rounded-full h-10 w-10"
                            />
                        </Link>
                        <button
                            className="px-4 py-2 border border-red-500 rounded-full flex items-center hover:shadow-md"
                            onClick={onLogout}
                        >
                            <LogOutIcon className="h-4 w-4 mr-2" />
                            <span>Logout</span>
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="login"
                            className="hover:cursor-pointer bg-red-500 px-4 py-2 rounded-full text-white hover:shadow-md"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="hover:cursor-pointer border border-red-500 px-4 py-2 rounded-full hover:shadow-md"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
