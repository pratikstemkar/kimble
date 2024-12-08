import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../../constants";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Loader2Icon } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Write = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            content: "",
        },
    });

    const onSubmit = data => {
        setLoading(true);
        const body = {
            ...data,
            user_id: user.id,
        };
        const token = localStorage.getItem("token");
        axios
            .post(`${BASE_URL}/posts`, body, {
                headers: { token },
            })
            .then(res => {
                console.log(res);
                setLoading(false);
                if (res.data.status == "success") {
                    navigate("/stories");
                    toast.success("Story posted successfully!", {
                        position: "bottom-right",
                    });
                } else {
                    console.log(res.data.error);
                    setError(res.data.error);
                    toast.error("Failed to post the story!", {
                        position: "bottom-right",
                    });
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="max-w-7xl m-auto mt-10">
            <Helmet>
                <title>Write Story - Kimble</title>
            </Helmet>
            <div className="flex flex-col items-center space-y-5">
                <h1 className="text-2xl font-bold">Write a new story</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-2 border p-5 rounded-xl w-1/3"
                >
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="title">Title</label>
                        <input
                            placeholder="Enter Title"
                            {...register("title", {
                                required: true,
                            })}
                            className="w-full border rounded-lg px-2 py-1"
                            type="text"
                            id="title"
                        />
                    </div>
                    {errors.title?.type == "required" && (
                        <span className="text-red-500 text-sm">
                            Title is required
                        </span>
                    )}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="content">Content</label>
                        <textarea
                            {...register("content", { required: true })}
                            className="w-full border rounded-lg px-2 py-1"
                            placeholder="Enter content"
                            type="text"
                            id="content"
                            rows="5"
                        />
                    </div>
                    {errors.content && (
                        <span className="text-red-500 text-sm">
                            Content is required
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
                            <span>Post Story</span>
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

export default Write;
