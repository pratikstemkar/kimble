import { useForm } from "react-hook-form";

const Write = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: "",
            content: "",
        },
    });

    const onSubmit = data => console.log(data);

    return (
        <div className="max-w-7xl m-auto mt-10">
            <div className="flex flex-col items-center space-y-5">
                <h1 className="text-2xl font-bold">Write a new story</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-2 border p-5 rounded-xl w-1/3"
                >
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="title">Title</label>
                        <input
                            placeholder="Enter Title"
                            {...register("title", {
                                required: true,
                            })}
                            className="w-full border rounded-lg px-2 py-1"
                            type="text"
                            id="title"
                        />
                    </div>
                    {errors.title?.type == "required" && (
                        <span className="text-red-500 text-sm">
                            Title is required
                        </span>
                    )}
                    <div className="flex flex-col space-y-2">
                        <label htmlFor="content">Content</label>
                        <textarea
                            {...register("content", { required: true })}
                            className="w-full border rounded-lg px-2 py-1"
                            placeholder="Enter content"
                            type="text"
                            id="content"
                            rows="5"
                        />
                    </div>
                    {errors.content && (
                        <span className="text-red-500 text-sm">
                            Content is required
                        </span>
                    )}

                    <div className="flex justify-center">
                        <input
                            type="submit"
                            className="px-5 py-2 rounded-full bg-red-500 text-white hover:cursor-pointer hover:shadow-lg"
                            value="Post Story"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Write;
