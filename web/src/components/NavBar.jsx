import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="px-20 py-4 flex justify-between items-center shadow-md">
            <div>
                <Link
                    to="/"
                    className="text-4xl font-extrabold tracking-tighter"
                >
                    <div className="flex space-x-2 items-center group">
                        <img
                            src="/logo.png"
                            className="h-10 w-10 group-hover:-translate-y-2 transition duration-300 ease-in-out group-hover:shadow-lg"
                        />
                        <span>Kimble</span>
                    </div>
                </Link>
            </div>
            <div className="flex space-x-2">
                <Link
                    to="login"
                    className="hover:cursor-pointer bg-violet-500 px-4 py-2 rounded-full text-white hover:shadow-md"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="hover:cursor-pointer border border-violet-500 px-4 py-2 rounded-full hover:shadow-md"
                >
                    Register
                </Link>
            </div>
        </nav>
    );
};

export default NavBar;
