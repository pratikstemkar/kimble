import axios from "axios";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../../constants";
import { useNavigate } from "react-router";
import { login } from "../../../store/features/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader2Icon } from "lucide-react";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = data => {
        setLoading(true);
        axios
            .post(`${BASE_URL}/auth/login`, data)
            .then(res => {
                console.log(res);
                if (res.data.status === "success") {
                    setLoading(false);
                    navigate("/stories");
                    dispatch(login(res.data.data));
                    toast.success("Log In successful!", {
                        position: "bottom-right",
                    });
                } else {
                    setLoading(false);
                    console.log(res.data.error);
                    setError(res.data.error);
                    toast.error("Log In Failed!", {
                        position: "bottom-right",
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className="max-w-7xl m-auto">
            <div className="flex flex-col justify-center items-center space-y-5 mt-20">
                <h1 className="text-4xl font-bold">Login</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-2 border p-5 rounded-xl w-1/3"
                >
                    <div className="flex space-x-2 items-center">
                        <label htmlFor="email">Email</label>
                        <input
                            placeholder="Enter Email"
                            {...register("email", {
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid Email Address",
                                },
                            })}
                            className="w-full border rounded-lg px-2 py-1"
                            type="text"
                            id="email"
                        />
                    </div>
                    {errors.email?.type == "required" && (
                        <span className="text-red-500 text-sm">
                            Email is required
                        </span>
                    )}
                    {errors.email?.type == "pattern" && (
                        <span className="text-red-500 text-sm">
                            {errors.email?.message}
                        </span>
                    )}
                    <div className="flex space-x-2 items-center">
                        <label htmlFor="password">Password</label>
                        <input
                            {...register("password", { required: true })}
                            className="w-full border rounded-lg px-2 py-1"
                            placeholder="Enter Password"
                            type="password"
                            id="password"
                        />
                    </div>
                    {errors.password && (
                        <span className="text-red-500 text-sm">
                            Password is required
                        </span>
                    )}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`flex space-x-2 items-center px-5 py-2 rounded-full text-white hover:cursor-pointer hover:shadow-lg ${
                                loading ? "bg-gray-500" : "bg-red-500"
                            }`}
                            disabled={loading}
                        >
                            {loading && (
                                <Loader2Icon className="h-4 w-4 animate-spin" />
                            )}
                            <span>Login</span>
                        </button>
                    </div>
                    {error !== "" && (
                        <span className="text-red-500 text-sm">{error}</span>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login;
