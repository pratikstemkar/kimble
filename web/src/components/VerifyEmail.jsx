import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setEmailVerified } from "../../store/features/userSlice";

const VerifyEmail = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            otp: "",
        },
    });

    const onSubmit = data => {
        setLoading(true);
        const body = {
            ...data,
            email: user.email,
        };
        const token = localStorage.getItem("token");
        axios
            .patch(`${BASE_URL}/auth/verify`, body, {
                headers: { token },
            })
            .then(res => {
                setLoading(false);
                if (res.data.status === "success") {
                    console.log(res.data.data);
                    dispatch(setEmailVerified());
                    toast.success("Email Verified!", {
                        position: "bottom-right",
                    });
                } else {
                    console.log(res.data.error);
                    setError(res.data.error);
                    toast.error(res.data.error, {
                        position: "bottom-right",
                    });
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="max-w-7xl m-auto mt-10">
            <div className="flex flex-col space-y-5 items-center">
                <h1 className="text-2xl font-bold">Verify Email</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-2 border p-5 rounded-xl w-1/3"
                >
                    <div className="flex space-x-2 items-center">
                        <label htmlFor="otp">OTP</label>
                        <input
                            placeholder="Enter OTP"
                            {...register("otp", {
                                required: true,
                            })}
                            className="w-full border rounded-lg px-2 py-1"
                            type="number"
                            id="otp"
                        />
                    </div>
                    {errors.otp?.type == "required" && (
                        <span className="text-red-500 text-sm">
                            OTP is required
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
                            <span>Verify OTP</span>
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

export default VerifyEmail;
