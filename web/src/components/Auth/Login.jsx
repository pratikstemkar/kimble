import { useForm } from "react-hook-form";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = data => console.log(data);

    return (
        <div className="max-w-7xl m-auto">
            <div className="flex flex-col justify-center items-center space-y-5 mt-20">
                <h1 className="text-4xl font-bold">Login</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-2 border p-5 rounded-xl w-1/3"
                >
                    <div className="flex space-x-2 items-center">
                        <label htmlFor="email">Email</label>
                        <input
                            placeholder="Enter Email"
                            {...register("email", { required: true })}
                            className="w-full border rounded-lg px-2 py-1"
                            type="text"
                            id="email"
                        />
                    </div>
                    {errors.email && (
                        <span className="text-red-500 text-sm">
                            Email is required
                        </span>
                    )}
                    <div className="flex space-x-2 items-center">
                        <label htmlFor="password">Password</label>
                        <input
                            {...register("password", { required: true })}
                            className="w-full border rounded-lg px-2 py-1"
                            placeholder="Enter Password"
                            type="password"
                            id="password"
                        />
                    </div>
                    {errors.password && (
                        <span className="text-red-500 text-sm">
                            Password is required
                        </span>
                    )}

                    <div className="flex justify-center">
                        <input
                            type="submit"
                            className="px-5 py-2 rounded-full bg-violet-500 text-white hover:cursor-pointer hover:shadow-lg"
                            value="Login"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
