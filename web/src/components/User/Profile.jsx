import { useSelector } from "react-redux";

const Profile = () => {
    const { user } = useSelector(state => state.user);

    return (
        <div className="max-w-7xl m-auto mt-10">
            <div className="flex flex-col space-y-10">
                <div className="flex flex-col justify-center items-center space-y-5">
                    <img
                        src={user.pfp}
                        className="rounded-full h-40 w-40"
                    />
                    <div className="flex flex-col items-center space-y-2">
                        <span className="text-2xl font-semibold">
                            {user.firstName} {user.lastName}
                        </span>
                        {/* <span className="w-1/2">{JSON.stringify(user)}</span> */}
                        <span className="text-gray-500">{user.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
