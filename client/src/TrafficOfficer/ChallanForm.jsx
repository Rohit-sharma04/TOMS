import axios from "axios";
import { useForm } from "react-hook-form";

export const CallanForm = () => {
  const { register, handleSubmit ,reset} = useForm();

  const handleFinish = async (data) => {
    try {
      console.log("data", data)
      console.log(data.image)
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'image') {
          // Handle files separately
          for (const file of value) {
            formData.append('image', file);
          }
        } else {
          // Append other fields
          formData.append(key, value);
        }
      });

      // Log FormData object for inspection
      console.log('FormData:', [...formData]);

      // Submit the form data to the server
      const res = await axios.post('api/officer/new-challan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        alert("Form submitted Successfully!");
        reset();
      } else {
        alert(res.data.message);
      }
    console.log(res)
    
    } catch (error) {
      console.error('Error:', error);
    }

  }

  return (
    <>
      <section className="bg-gray-50 py-1 ">
        <div className="mx-auto mt-6 w-full px-4 lg:w-8/12">
          <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 bg-slate-100 shadow-sm ">
            <div className="mb-0 rounded-t bg-white px-6 py-6">
              <div className="flex justify-between text-center">
                <h6 className="text-blueGray-700 text-xl font-bold">E-CHALLAN FORM</h6>
              </div>
            </div>
            <div className="flex-auto px-4 py-10 pt-0 lg:px-10">
              <form onSubmit={handleSubmit(handleFinish)}>
                <h6 className="mb-6 mt-3 text-sm font-bold uppercase text-slate-400">Vehicle Information</h6>

                <div className="flex flex-wrap">
                  {/* <div className="w-full px-4 lg:w-6/12">
                    <div className="relative mb-3 w-full">
                      <label className="mb-2 block text-xs font-bold uppercase text-gray-600" >Name *</label>
                      <input type="text"
                        {...register('name', { required: true })}
                        className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:outline-none focus:ring" placeholder="Lucky" />
                    </div>
                  </div> */}
                  
                  {/* <div className="w-full px-4 lg:w-6/12">
                    <div className="relative mb-3 w-full">
                      <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > Email address *</label>
                      <input
                        type="email"
                        {...register('email', { required: true })}
                        className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm  transition-all duration-150 ease-linear focus:outline-none focus:ring" placeholder="jesse@example.com" />
                    </div>
                  </div> */}
                  <div className="w-full px-4 lg:w-6/12">
                    <div className="relative mb-3 w-full">
                      <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > Vehicle Number *</label>
                      <input type="text"
                        {...register('challanVehicleNumber', { required: true })}
                        className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:outline-none focus:ring" placeholder="IN 10 AB 1234" />
                    </div>
                  </div>
                </div>
                {/* <!-- end of offenser info -->  */}
                <hr className="border-b-1 mt-6 border-gray-300" />

                <h6 className="mb-6 mt-3 text-sm font-bold uppercase text-slate-400">Offense Information</h6>
                <div className="flex flex-wrap">
                  <div className="lg:w-12/12 w-full px-4">
                    <div className="relative mb-3 w-full">
                      <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > place of voilation*</label>
                      <input type="text"
                        {...register('address', { required: true })}
                        className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:outline-none focus:ring" placeholder="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" />
                    </div>
                  </div>
                  <div className="w-full px-4 lg:w-4/12">
                    <div className="relative mb-3 w-full">
                      <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > date of voilation *</label>
                      <input type="date"
                        {...register('date', { required: true })}
                        className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:outline-none focus:ring" />
                    </div>
                  </div>
                  <div className="w-full px-4 lg:w-4/12">
                    <div className="relative mb-3 w-full">
                      <label className="mb-2 block text-xs font-bold uppercase text-gray-600" >  time of voilation *</label>
                      <input type="time"
                        {...register('time', { required: true })}
                        className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:outline-none focus:ring" />
                    </div>
                  </div>
                </div>

                {/* <!-- end of offense info -->  */}

                {/* certificate upload */}
                <hr className="border-b-1 mt-6 border-gray-300" />

                <h6 className="mb-6 mt-3 text-sm font-bold uppercase text-slate-400">Images</h6>
                <div className="flex flex-wrap">
                  <div className="lg:w-12/12 w-full px-4">
                    <div className="relative mb-3 w-full">
                      <label className=" text-gray-900  mb-2 block text-xs font-bold uppercase" htmlFor="multiple_files">Image Upload *</label>
                      <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white  shadow-sm transition-all duration-150 ease-linear focus:outline-none focus:ring" id="multiple_files" type="file" multiple
                        {...register('image', { required: true })}
                      />
                      <p className="mt-1 text-xs text-gray-500 " id="file_input_help">SVG, PNG, JPG.</p>
                    </div>
                  </div>
                </div>




                {/* offense description section */}
                <hr className="border-b-1 mt-6 border-gray-300" />

                <h6 className="mb-6 mt-3 text-sm font-bold uppercase text-slate-400">offense description</h6>
                <div className="flex flex-wrap">
                  <div className="lg:w-12/12 w-full px-4">
                    <div className="relative mb-3 w-full">
                      <label className="text-blueGray-600 mb-2 block text-xs font-bold uppercase" > description </label>
                      <textarea
                        type="text"
                        {...register('description')}
                        className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:outline-none focus:ring" rows="4"
                        placeholder="Over speeding."></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4 lg:w-6/12">
                    <div className="relative mb-3 w-full">
                      <label className="mb-2 block text-xs font-bold uppercase text-gray-600" > Fine Amount(Rs)*</label>
                      <input type="number"
                        {...register('fine', { required: true })}
                        className="w-full rounded border-0 bg-white px-3 py-3 text-sm shadow-sm transition-all duration-150 ease-linear focus:outline-none focus:ring" placeholder="1000" />
                    </div>
                  </div>


                </div>
                <button className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 mt-3" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

