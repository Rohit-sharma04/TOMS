import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

const SignUp = () => {

    const { register, handleSubmit } = useForm();
    const [role] = useState("user");
    const navigate = useNavigate()

    const handleFinish = async (data) => {
        try {
            console.log(data)
            // const role=data.role;
            toast.loading("Please wait...");
            const res = await axios.post(`api/auth/signup`, data);
            if (res.data.success) {
                toast.dismiss();
                toast.success("Register Successfully!");
                navigate("/login");
            } else {
                toast.dismiss();
                toast.info(res.data.message);
            }
            console.log(res)
        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }

    }

    return (
        <>
            <section className="bg-gray-50 ">
                <div className="mx-auto flex flex-col items-center justify-center px-6 py-8  ">
                    {/* <div  className=" flex items-center text-2xl font-semibold text-gray-900 ">
                <img className="mr-2  w-16 h-16 rounded-full " src={logo} alt="logo" />
                MediCare
              </div> */}
                    <div className="w-full rounded-lg bg-white shadow  sm:max-w-md md:mt-0 xl:p-0">
                        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900  md:text-2xl">Create an Account</h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleFinish)}>
                                {/* <!--image upload start--> */}

                                {/* <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 ">Your profile pic</label>
                    <div className="flex items-center">
                      <div className="mr-4 h-12 w-12 flex-none overflow-hidden rounded-xl border">
                        <img className="mr-4 h-12 w-12 object-cover" id="imgInp" src={profilePic} alt="Avatar Upload" />
                      </div>
                      <label className="cursor-pointer">
                        <span className="rounded-full bg-green-400 px-4 py-2 text-sm text-white hover:bg-green-500 hover:shadow-lg focus:outline-none">Browse</span>
                        <input type="file" className="hidden"
                          onChange={handleSelectFile}
                        />
                      </label>
                    </div> */}

                                {/* <!-- image upload end --> */}

                                {/* <div>
                                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 ">Signup as a</label>
                                    <select className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600  sm:text-sm"
                                        {...register('role', {
                                            onChange: (e) => setRole(e.target.value)
                                        })}>
                                        <option value={"user"}>user</option>
                                        <option value={"admin"}>admin</option>
                                        <option value={"officer"}>traffic Officer</option>
                                    </select>
                                </div> */}

                                <div>
                                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 ">Your name</label>
                                    <input type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600  sm:text-sm" placeholder="john Doe"  {...register('name', { required: true })} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 ">Your email</label>
                                    <input type="email" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600  sm:text-sm" placeholder="name@domain.com"
                                        {...register('email', { required: true })} />
                                </div>
                                {role === 'user' && <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 ">Your Vehicle Number</label>
                                    <input type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600  sm:text-sm" placeholder="IN 10 1234"
                                        {...register('vehicleNumber', { required: true })} />
                                </div>}
                                <div>
                                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 ">Password</label>
                                    <input type="password" placeholder="•••••••" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                                        {...register('password', { required: true })} />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex h-5 items-center">
                                        <input id="terms" aria-describedby="terms" type="checkbox" className="focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 " required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="font-light text-gray-500 ">I accept the <a className="font-medium text-primary-600 hover:underline " >Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button type="submit" className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center bg-blue-600 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300">Create an account</button>
                                <p className="text-sm font-light text-gray-500 ">Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline text-blue-600">Login here</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default SignUp
