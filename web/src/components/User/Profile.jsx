import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "../../../constants";
import {
    BanIcon,
    CircleCheckBigIcon,
    Edit2Icon,
    Loader2Icon,
} from "lucide-react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import UserStories from "./UserStories";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const Profile = () => {
    const { userId } = useParams();
    const [data, setData] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [doEdit, setDoEdit] = useState(false);
    const [toggleActive, setToggleActive] = useState(false);
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${BASE_URL}/users/${userId}`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            })
            .then(res => {
                setLoading(false);
                if (res.data.status === "success") {
                    setData(res.data.data[0]);
                    console.log(res.data.data[0]);
                } else {
                    setError(res.data.error);
                }
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    }, [userId, toggleActive]);

    const onBan = () => {
        const token = localStorage.getItem("token");
        axios
            .patch(
                `${BASE_URL}/users/${data.id}/toggle-active`,
                {},
                { headers: { token } }
            )
            .then(res => {
                if (res.data.status === "success") {
                    setToggleActive(prevState => !prevState);
                    console.log(res.data.data);
                    toast.success("User toggled!", {
                        position: "bottom-right",
                    });
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
        <div className="max-w-7xl m-auto mt-10">
            <Helmet>
                <title>
                    {!loading
                        ? data.firstName + " " + data.lastName
                        : "Profile"}{" "}
                    - Kimble
                </title>
            </Helmet>
            <div className="flex flex-col space-y-10">
                {loading && (
                    <Loader2Icon className="animate-spin h-10 text-center w-full" />
                )}
                {error !== "" && error}
                {!loading && (
                    <div className="flex flex-col justify-center items-center space-y-5">
                        <img
                            src={data.pfp}
                            className="rounded-full h-40 w-40"
                        />
                        {/* <div>{JSON.stringify(data)}</div> */}
                        <div className="flex flex-col items-center space-y-2">
                            <span className="text-2xl font-semibold">
                                {data.firstName} {data.lastName}{" "}
                                {user.role === "admin" && (
                                    <button
                                        className="hover:bg-gray-200 p-2 rounded-lg"
                                        title={
                                            data.isActive
                                                ? "Deactivate User"
                                                : "Activate User"
                                        }
                                        onClick={onBan}
                                    >
                                        {data.isActive ? (
                                            <BanIcon className="h-4 w-4 text-red-500" />
                                        ) : (
                                            <CircleCheckBigIcon className="h-4 w-4 text-green-500" />
                                        )}
                                    </button>
                                )}
                            </span>
                            {/* <span className="w-1/2">{JSON.stringify(data)}</span> */}
                            <span className="text-gray-500">{data.email}</span>
                            {user.id == userId && !doEdit && (
                                <button
                                    onClick={() => setDoEdit(true)}
                                    className="px-4 py-2 bg-red-500 flex items-center rounded-full text-white"
                                >
                                    <Edit2Icon className="h-4 w-4 mr-2" />
                                    <span>Edit Profile</span>
                                </button>
                            )}
                            {doEdit && <EditProfile user={data} />}
                            <UserStories userId={data.id} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
