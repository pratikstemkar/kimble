const About = () => {
    return (
        <div className="max-w-7xl m-auto mt-10">
            <div className="flex flex-col space-y-5">
                <h1 className="text-2xl font-bold">About Us</h1>
                <div className="flex flex-col space-y-2">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Placeat laborum qui officia repellendus est eaque unde
                        natus, odio quidem officiis aperiam quaerat deserunt
                        commodi sequi accusamus! Dolores cumque exercitationem
                        necessitatibus? Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Sapiente possimus eveniet laudantium
                        culpa magni, totam accusamus nemo quod quisquam ea
                        perferendis exercitationem impedit dolor repellendus
                        tenetur, consequatur distinctio. Perferendis, error.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Beatae reiciendis distinctio cumque provident impedit
                        fugiat est perferendis quo, alias pariatur voluptate,
                        velit perspiciatis veniam. Laborum voluptate praesentium
                        consectetur eveniet suscipit!
                    </p>
                </div>
                <h1 className="text-xl font-bold">Our Team</h1>
                <div className="flex">
                    <div className="flex flex-col space-y-1">
                        <a
                            href="https://linkedin.com/in/pratikstemkar"
                            target="_blank"
                        >
                            <img
                                src="https://github.com/pratikstemkar.png"
                                className="h-32 w-32 rounded-full"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
