import { useEffect, useState } from "react";
import ChallanPaymentStatusChart from "../Charts/ChallanPaymentStatusChart"
import ComplaintStatusChart from "../Charts/ComplaintStatusChart"
import axios from "axios";

export const Dashboard = () => {
  const [challanPaymentStatus, setChallanPaymentStatus] = useState([]);
  const [complaintStatusData, setComplaintStatusData] = useState([]);

  useEffect(() => {
    const fetchChallanData = async () => {
      try {
        const toatalChallanStatusData = await axios.get('api/officer/total-challan-status-data')
        setChallanPaymentStatus([toatalChallanStatusData.data.data.pendingCount, toatalChallanStatusData.data.data.completedCount]);

        const complaintStatusResponse = await axios.get('api/officer/complaint-status-data');
        setComplaintStatusData(complaintStatusResponse.data.data);

      }
      catch (err) {
        console.log(err);
      }
    }

    fetchChallanData();
  }, []);

  let totalComplaints = 0
  return (
    <>
      <main className="">
        <div className="grid mb-4 pb-10 px-8 mx-4 rounded-3xl">
          <div className="grid grid-cols-12 gap-6">
            <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
              <div className="col-span-12 mt-8">
                <div className="flex items-center h-10 intro-y">
                  <h2 className="mr-5 text-lg font-medium truncate">Dashboard</h2>
                </div>
                <div className="grid grid-cols-8 gap-6 mt-5">

                  <div className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white mr-10 sm:mr-0">
                    <div className="p-5 ">
                      <div className="flex justify-between">
                        <svg xmlns="http://www.w3.org/2000/svg" className="max-h-7 max-w-7 text-pink-600"
                          fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                          <path strokeLinecap="round" strokeLinejoin="round"
                            strokeWidth="2"
                            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                        </svg>

                      </div>
                      <div className="mx-1 w-full flex-1">
                        <div className="sm:flex">
                          <div>
                            <div className="mt-3 text-3xl font-bold leading-8">{challanPaymentStatus[0] + challanPaymentStatus[1]}</div>
                            <div className="mt-1 text-base text-gray-600">Total Challan </div>
                          </div>
                          <div className="mt-3 w-full">
                            {console.log("challanPaymentStatus", challanPaymentStatus[0] + challanPaymentStatus[1])}
                            <ChallanPaymentStatusChart data={challanPaymentStatus} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white mr-10 sm:mr-0">
                    <div className="p-5 ">
                      <div className="flex justify-between">

                        <svg className="max-h-7 max-w-7 rounded-full" viewBox='0 0 32 32'>
                          <g strokeWidth='10'>
                            <circle className="fill-transparent" cx='16' cy='16' r='16' strokeDasharray='30 100' strokeDashoffset='0' stroke='#ff0000'></circle>
                            <circle className="fill-transparent" cx='16' cy='16' r='16' strokeDasharray='15 100' strokeDashoffset='-30' stroke='#eee'></circle>
                            <circle className="fill-transparent" cx='16' cy='16' r='16' strokeDasharray='56 100' strokeDashoffset='-45' stroke='#f1c40f'></circle>
                          </g>
                        </svg>
                      </div>
                      <div className="mx-1 w-full flex-1">
                        <div className="md:flex ">
                          <div>

                            {complaintStatusData.forEach((complaint) => totalComplaints += complaint)}

                            <div className="mt-3 text-3xl font-bold leading-8">{totalComplaints}</div>
                            <div className="mt-1 text-base text-gray-600">Total Complaints</div>
                          </div>
                          <div className="mt-3 w-full">
                            <ComplaintStatusChart data={complaintStatusData} />

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

