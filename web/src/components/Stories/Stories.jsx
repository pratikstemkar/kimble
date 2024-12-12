import { useEffect, useState } from "react";
import StoryCard from "./StoryCard";
import axios from "axios";
import { BASE_URL } from "../../../constants";
import { Helmet } from "react-helmet-async";

const Stories = () => {
    const [posts, setPosts] = useState([]);
    const [needLoad, setNeedLoad] = useState(false);

    const token = localStorage.getItem("token");
    const loadPosts = () => {
        axios
            .get(`${BASE_URL}/posts`, {
                headers: { token },
            })
            .then(res => {
                console.log(res.data.data);
                setPosts(res.data.data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        setInterval(() => loadPosts(), 5000);
    }, [needLoad]);

    return (
        <div className="max-w-7xl m-auto mt-10">
            <Helmet>
                <title>Stories - Kimble</title>
            </Helmet>
            <h1 className="text-2xl font-bold">Top Stories</h1>
            {/* {JSON.stringify(posts)} */}
            <div className="mt-2 columns-3">
                {posts.map((post, index) => (
                    <StoryCard
                        post={post}
                        key={index}
                        setNeedLoad={setNeedLoad}
                    />
                ))}
            </div>
        </div>
    );
};

export default Stories;
