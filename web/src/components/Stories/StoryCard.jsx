import { useEffect, useState } from "react";
import { formatDateIST, timeAgoIST } from "../../../utils/utils";
import axios from "axios";
import { BASE_URL } from "../../../constants";
import { Link } from "react-router";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const StoryCard = ({ post, setNeedLoad }) => {
    const [userData, setUserData] = useState({});
    const { user } = useSelector(state => state.user);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState("");

    const token = localStorage.getItem("token");
    const loadUser = id => {
        // setLoading(true);
        axios
            .get(`${BASE_URL}/users/${id}`, {
                headers: { token },
            })
            .then(res => {
                // setLoading(false);
                if (res.data.status === "success") {
                    console.log(res.data.data[0]);
                    setUserData(res.data.data[0]);
                } else {
                    console.log(res.data.error);
                    // setError(res.data.error);
                }
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        loadUser(post.user_id);
    }, [post.user_id]);

    const deletePost = () => {
        const token = localStorage.getItem("token");
        axios
            .put(
                `${BASE_URL}/posts/${post.id}/delete`,
                {},
                {
                    headers: { token },
                }
            )
            .then(res => {
                if (res.data.status === "success") {
                    console.log(res.data.data);
                    toast.success("Post Deleted!", {
                        position: "bottom-right",
                    });
                    setNeedLoad(prevState => !prevState);
                } else {
                    console.log(res.data.error);
                    toast.error(res.data.error, {
                        position: "bottom-right",
                    });
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="mb-4 break-inside-avoid">
            <div className="border rounded-xl p-5 flex flex-col space-y-2">
                <div className="flex space-x-2 items-center">
                    <div>
                        <img
                            src={userData.pfp}
                            className={`object-cover rounded-full h-10 w-10`}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <div className="flex items-center gap-x-2 flex-wrap">
                            <h4 className="font-semibold text-lg">
                                {post.title}
                            </h4>
                            <span
                                className="text-sm text-gray-500 hover:text-black hover:cursor-pointer"
                                title={formatDateIST(post.createdAt)}
                            >
                                {timeAgoIST(post.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
                <p className="mt-3 text-justify">{post.content}</p>
                <div className="flex justify-between items-center">
                    <div>
                        <Link
                            to={`/users/${userData.id}`}
                            className="hover:underline underline-offset-4 text-gray-500 hover:text-black"
                        >
                            <h6 className="flex space-x-2 text-sm">
                                <span>
                                    {userData.firstName} {userData.lastName}
                                </span>
                            </h6>
                        </Link>
                        {userData.role === "admin" && (
                            <span className="text-xs rounded-full px-1.5 py-0.5 bg-red-500 text-white">
                                Admin
                            </span>
                        )}
                    </div>
                    <div className="flex items-center">
                        {user.id == userData.id && (
                            <Link
                                to={`/stories/${post.id}/edit`}
                                className="hover:bg-gray-200 p-2 rounded-lg"
                                title="Edit Story"
                            >
                                <PencilIcon className="h-4 w-4" />
                            </Link>
                        )}
                        {(user.id == userData.id || user.role === "admin") && (
                            <button
                                className="hover:bg-gray-200 p-2 rounded-lg"
                                title="Delete Story"
                                onClick={deletePost}
                            >
                                <Trash2Icon className="h-4 w-4 text-red-500" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoryCard;
