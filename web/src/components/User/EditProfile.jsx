import axios from "axios";
import { Loader2Icon, SaveIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../../constants";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../store/features/userSlice";

const EditProfile = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            pfp: user.pfp,
        },
    });

    const onSubmit = data => {
        setLoading(true);

        const token = localStorage.getItem("token");
        axios
            .put(`${BASE_URL}/users/${user.id}`, data, {
                headers: { token },
            })
            .then(res => {
                setLoading(false);
                if (res.data.status === "success") {
                    console.log(res.data);
                    navigate("/stories");
                    toast.success("Profile Updated!", {
                        position: "bottom-right",
                    });
                    dispatch(updateUser(data));
                } else {
                    setError(res.data.error);
                    console.log(res.data.error);
                    toast.error(res.data.error, {
                        position: "bottom-right",
                    });
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="flex flex-col space-y-5 justify-center items-center">
            <div className="flex flex-col space-y-2 mt-5">
                {/* {JSON.stringify(user)} */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-2 border p-5 rounded-xl"
                >
                    <div className="flex space-x-2 items-center justify-between">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            placeholder="Enter First Name"
                            {...register("firstName", { required: true })}
                            className="border rounded-lg px-2 py-1"
                            type="text"
                            id="firstName"
                        />
                    </div>
                    {errors.firstName && (
                        <span className="text-red-500 text-sm">
                            First Name is required
                        </span>
                    )}
                    <div className="flex space-x-2 justify-between items-center">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            placeholder="Enter Last Name"
                            {...register("lastName", { required: true })}
                            className="border rounded-lg px-2 py-1"
                            type="text"
                            id="lastName"
                        />
                    </div>
                    {errors.lastName && (
                        <span className="text-red-500 text-sm">
                            Last Name is required
                        </span>
                    )}
                    <div className="flex justify-between space-x-2 items-center">
                        <label htmlFor="pfp">Profile Picture</label>
                        <input
                            placeholder="Enter URL for Profile Picture"
                            {...register("pfp", { required: true })}
                            className=" border rounded-lg px-2 py-1"
                            type="text"
                            id="pfp"
                        />
                    </div>
                    {errors.pfp && (
                        <span className="text-red-500 text-sm">
                            Profile Picture is required
                        </span>
                    )}

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`flex space-x-2 mt-2 items-center px-5 py-2 rounded-full bg-red-500 text-white hover:cursor-pointer hover:shadow-lg${
                                loading ? "bg-gray-500" : "bg-red-500"
                            }`}
                            disabled={loading}
                        >
                            {loading && (
                                <Loader2Icon className="h-4 w-4 animate-spin" />
                            )}
                            <SaveIcon className="h-4 w-4" />
                            <span>Save Changes</span>
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

export default EditProfile;
