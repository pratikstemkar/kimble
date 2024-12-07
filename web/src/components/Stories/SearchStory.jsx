import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "../../../constants";
import StoryCard from "./StoryCard";

const SearchStory = () => {
    const { searchQuery } = useParams();
    const [posts, setPosts] = useState([]);
    const [needLoad, setNeedLoad] = useState(false);

    const token = localStorage.getItem("token");
    const searchPosts = () => {
        axios
            .get(`${BASE_URL}/posts/search/${searchQuery}`, {
                headers: { token },
            })
            .then(res => {
                if (res.data.status == "success") {
                    setPosts(res.data.data);
                } else {
                    console.log(res.data.error);
                }
            })
            .catch(err => console.log(err));
    };

    useEffect(() => searchPosts(), [needLoad, searchQuery]);

    return (
        <div className="max-w-7xl m-auto mt-10">
            <div className="flex flex-col space-y-5">
                <h1 className="text-2xl font-bold">
                    Search for &apos;{searchQuery}&apos;
                </h1>
                {posts.length !== 0 && (
                    <div className="mt-2 columns-3">
                        {posts.map((post, index) => (
                            <StoryCard
                                post={post}
                                key={index}
                                setNeedLoad={setNeedLoad}
                            />
                        ))}
                    </div>
                )}
                {posts.length == 0 && <div>No stories matched the query.</div>}
            </div>
        </div>
    );
};

export default SearchStory;
