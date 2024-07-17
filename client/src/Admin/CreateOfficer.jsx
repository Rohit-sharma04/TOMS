import { useForm } from "react-hook-form";
import axios from 'axios'
import { toast } from "react-toastify";

const CreateOfficer = () => {

    const { register, handleSubmit,reset } = useForm();

    const handleFinish = async (data) => {
        try {
            console.log(data)
            toast.loading('please wait')
            const res = await axios.post(`api/admin/createOfficer`, data);
            toast.dismiss();
            if (res.data.success) {
                toast.success("Account Registered Successfully!");
                reset();
            } else {
                toast.info(res.data.message);
            }
            console.log(res)
        } catch (error) {
            toast.dismiss();
            console.log(error);
            toast.error("Something Went Wrong");
        }

    }

    return (
        <>
            <section className="bg-gray-50 ">
                <div className="mx-auto flex flex-col items-center justify-center px-6 py-8  ">

                    <div className="w-full rounded-lg bg-white shadow  sm:max-w-md md:mt-0 xl:p-0">
                        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900  md:text-2xl">Create Officer Account</h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(handleFinish)}>

                                <div>
                                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 ">Officer name</label>
                                    <input type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600  sm:text-sm" placeholder="john Doe"  {...register('name', { required: true })} />
                                </div>
                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 ">Officer email</label>
                                    <input type="email" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600  sm:text-sm" placeholder="name@domain.com"
                                        {...register('email', { required: true })} />
                                </div>
                              
                                <div>
                                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 ">Password</label>
                                    <input type="password" placeholder="•••••••" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                                        {...register('password', { required: true })} />
                                </div>
                              
                                <button type="submit" className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center bg-blue-600 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300">Create an account</button>
                               
                            </form>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}

export default CreateOfficer
