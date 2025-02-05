import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
// import { useState } from 'react';
import axios from 'axios'
import { useContext } from 'react';
import { UserContext } from './Context/UserContext';
import { toast } from 'react-toastify';

const Login = () => {

    const { register, handleSubmit } = useForm();
    // const [role, setRole] = useState("user");
    const { setName ,setEmail}=useContext(UserContext)

    const navigate = useNavigate()

    const handleFinish = async (data) => {
        try {
            console.log(data)
            // const role=data.role;
            toast.loading("Please wait...");
            const res = await axios.post(`api/auth/login`, data);
            if (res.data.success) {
                toast.dismiss();
                toast.success("Login Successfully!");

                    let userData = await axios.get("api/auth/getuserData");
                    console.log("data", userData.data);
                    if (userData.data.success) {
                        console.log("user data",userData.data)
                        setName(userData.data.data.name);
                        setEmail(userData.data.data.email);
                    } else {
                        toast.info(userData.data.message);
                    }
                
                navigate(`/${res.data.role}/dashboard`);
            } else {
                toast.dismiss();
                if (res.status === 404) {
                    toast.info("User not found");
                } else {
                    toast.info(res.data.message);
                }
                toast.info(res.data.message);
            }
            console.log(res)
        } catch (error) {
            toast.dismiss();
            console.log(error);
            toast.error(error.response.data.message);
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
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900  md:text-2xl">Login</h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleFinish)}>


                                <div>
                                    <label htmlFor="role" className="mb-2 block text-sm font-medium text-gray-900 ">Login as a</label>
                                    <select className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600  sm:text-sm"
                                        {...register('role', {
                                            // onChange: (e) => setRole(e.target.value)
                                        })}>
                                        <option value={"user"}>user</option>
                                        <option value={"admin"}>admin</option>
                                        <option value={"officer"}>traffic Officer</option>
                                    </select>
                                </div>

                                {/* <div>
                                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 ">Your name</label>
                                    <input type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600  sm:text-sm" placeholder="john Doe"  {...register('name', { required: true })} />
                                </div> */}
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 ">Your email</label>
                                    <input type="email" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600  sm:text-sm" placeholder="name@domain.com"
                                        {...register('email', { required: true })} />
                                </div>
                                {/* {role === 'user' && <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 ">Your Vehicle Number</label>
                                    <input type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600  sm:text-sm" placeholder="IN 10 1234"
                                        {...register('vehicleNumber', { required: true })} />
                                </div>} */}
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
                                <button type="submit" className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center bg-blue-600 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300">Login</button>
                                <p className="text-sm font-light text-gray-500 ">Don&apos;t have an account? <Link to="/signup" className="font-medium text-primary-600 hover:underline text-blue-600">Signup here</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default Login
