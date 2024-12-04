const Footer = () => {
    return (
        <footer className="font-mono text-sm text-gray-400 px-20 py-4 flex justify-between">
            <div>
                <span>Kimble &copy; {new Date().getFullYear()}</span>
            </div>
            <div>
                Developed by{" "}
                <a
                    href="https://x.com/pratikstemkar"
                    target="_blank"
                    className="underline underline-offset-4 hover:text-black"
                >
                    Pratik Temkar
                </a>
            </div>
        </footer>
    );
};

export default Footer;
