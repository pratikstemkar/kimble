const StoryCard = () => {
    return (
        <div className="border rounded-xl p-5">
            <div className="flex space-x-2 items-center">
                <div>
                    <img
                        src="https://github.com/pratikstemkar.png"
                        className="rounded-full h-10 w-10"
                    />
                </div>
                <div>
                    <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-lg">
                            My First Story
                        </h4>
                        <span className="text-sm text-gray-500">at</span>
                        <span className="text-sm text-gray-500">
                            4 hours ago
                        </span>
                    </div>
                    <h6 className="text-gray-500 text-sm">John Doe</h6>
                </div>
            </div>
            <p className="mt-3 text-justify">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo
                facere commodi itaque dignissimos doloremque sequi cumque
                eligendi ipsa in vero ut rerum, ipsum neque at expedita dolorem,
                error debitis. Deleniti.
            </p>
        </div>
    );
};

export default StoryCard;
