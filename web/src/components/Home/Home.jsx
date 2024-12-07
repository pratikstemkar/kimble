import { Link } from "react-router";

const Home = () => {
    return (
        <div className="max-w-7xl m-auto">
            <div className="flex flex-col items-center space-y-5 mt-32">
                <h1 className="text-6xl font-extrabold tracking-tighter">
                    Read real stories by real people{" "}
                </h1>
                <h2 className="text-slate-400 font-lg font-light text-xl">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis laboriosam dicta voluptate inventore distinctio?
                </h2>
                <h4 className="w-1/2 text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nisi ut voluptate voluptatibus, harum inventore optio qui
                    nihil incidunt sint, quis fuga. Velit veritatis hic
                    explicabo sit quis, quaerat nemo culpa!
                </h4>
                <Link
                    to="/stories"
                    className="px-5 py-2 bg-red-500 text-white rounded-full hover:shadow-lg hover:scale-110 transition ease-in-out duration-300"
                >
                    Start Reading
                </Link>
            </div>
        </div>
    );
};

export default Home;
