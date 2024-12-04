import StoryCard from "./StoryCard";

const Stories = () => {
    return (
        <div className="max-w-7xl m-auto mt-10">
            <h1 className="text-2xl font-bold">Top Stories</h1>
            <div className="mt-2 grid grid-cols-3 gap-5">
                <StoryCard />
                <StoryCard />
                <StoryCard />
            </div>
        </div>
    );
};

export default Stories;
