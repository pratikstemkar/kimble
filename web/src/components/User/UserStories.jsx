import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../constants";
import StoryCard from "../Stories/StoryCard";

const UserStories = ({ userId }) => {
    const [posts, setPosts] = useState([]);
    const [needLoad, setNeedLoad] = useState(false);

    const token = localStorage.getItem("token");
    const loadPosts = () => {
        axios
            .get(`${BASE_URL}/posts/user/${userId}`, {
                headers: { token },
            })
            .then(res => {
                console.log(res.data.data);
                setPosts(res.data.data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => loadPosts(), [needLoad]);

    return (
        <div className="flex w-full m-auto">
            <div className="flex flex-col items-center mt-5">
                <h1 className="text-xl font-bold">Stories</h1>
                {posts.length !== 0 && (
                    <div className="mt-2 columns-3">
                        {/* {JSON.stringify(posts)} */}
                        {posts.map((post, index) => (
                            <StoryCard
                                post={post}
                                key={index}
                                setNeedLoad={setNeedLoad}
                            />
                        ))}
                    </div>
                )}
                {posts.length == 0 && (
                    <div className="text-center">
                        User has not written any stories.
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserStories;
