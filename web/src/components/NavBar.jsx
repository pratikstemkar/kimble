import { PencilIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router";
import { Link } from "react-router-dom";

const NavBar = () => {
    const { user } = useSelector(state => state.user);

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
                        to="featured"
                        className={({ isActive }) =>
                            isActive
                                ? "text-red-500 hover:text-red-500"
                                : "text-black hover:text-red-500"
                        }
                    >
                        Featured
                    </NavLink>
                    <NavLink
                        to="about"
                        className={({ isActive }) =>
                            isActive
                                ? "text-red-500 hover:text-red-500"
                                : "text-black hover:text-red-500"
                        }
                    >
                        About
                    </NavLink>
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
                                src="https://github.com/pratikstemkar.png"
                                className="rounded-full h-10 w-10"
                            />
                        </Link>
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
