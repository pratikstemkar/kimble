import { useParams } from "react-router";

const Profile = () => {
    const { userId } = useParams();

    return <div>{userId}</div>;
};

export default Profile;
