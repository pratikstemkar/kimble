import { useForm } from "react-hook-form";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = data => console.log(data);

    return (
        <div className="max-w-7xl m-auto">
            <div className="flex flex-col justify-center items-center space-y-5 mt-20">
                <h1 className="text-4xl font-bold">Register</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col space-y-2 border p-5 rounded-xl w-1/3"
                >
                    <div className="flex space-x-2 items-center justify-between">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            placeholder="Enter First Name"
                            {...register("firstName", { required: true })}
                            className="border rounded-lg px-2 py-1"
                            type="text"
                            id="firstName"
                        />
                    </div>
                    {errors.firstName && (
                        <span className="text-red-500 text-sm">
                            First Name is required
                        </span>
                    )}
                    <div className="flex space-x-2 justify-between items-center">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            placeholder="Enter Last Name"
                            {...register("lastName", { required: true })}
                            className="border rounded-lg px-2 py-1"
                            type="text"
                            id="lastName"
                        />
                    </div>
                    {errors.lastName && (
                        <span className="text-red-500 text-sm">
                            Last Name is required
                        </span>
                    )}
                    <div className="flex justify-between space-x-2 items-center">
                        <label htmlFor="email">Email</label>
                        <input
                            placeholder="Enter Email"
                            {...register("email", { required: true })}
                            className=" border rounded-lg px-2 py-1"
                            type="text"
                            id="email"
                        />
                    </div>
                    {errors.email && (
                        <span className="text-red-500 text-sm">
                            Email is required
                        </span>
                    )}
                    <div className="flex justify-between space-x-2 items-center">
                        <label htmlFor="password">Password</label>
                        <input
                            {...register("password", { required: true })}
                            className=" border rounded-lg px-2 py-1"
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
                            value="Register"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
