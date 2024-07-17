import axios from "axios";
import React, { useEffect, useState } from "react"
import Carousel from "../Components/Carousel";
import { toast } from "react-toastify";

const ComplaintStatus = () => {
    const [complaints, setComplaints] = useState();
    const [expandedRow, setExpandedRow] = useState(null);

    const  getStatusColor=(status)=> {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300';
            case 'In Progress':
                return 'bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300';
            case 'Resolved':
                return 'bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300';
            case 'Rejected':
                return 'bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300';
            case 'Under Review':
                return 'bg-purple-100 text-purple-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300';
            default:
                return 'bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300';
        }
    }
    
    useEffect(() => {
        const getData = async () => {
            let res = await axios.get("api/user/complaint-status");
            console.log("data", res.data);
            if (res.data.success) {
                console.log(res.data.complaintStatuses)
                setComplaints(res.data.complaintStatuses);
            } else {
                toast.info(res.data.message);
            }
        };
        getData();
    }, [])


    const toggleRow = (id) => {
        if (expandedRow === id) {
            setExpandedRow(null);
        } else {
            setExpandedRow(id);
        }
    };


    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex flex-column sm:flexRow flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">

                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 rtl:insetR-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="table-search" className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:textRight text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="hidden md:block px-6 py-3">
                                Challan id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Recorded On
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 ">
                                Last Updated
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Remark
                            </th>
                            {/* <th scope="col" className="px-6 py-3">
                                Action
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {complaints && complaints.map((complaint) => (
                            <React.Fragment key={complaint._id}>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" onClick={() => toggleRow(complaint._id)}>

                                    <th scope="row" className="hidden md:block px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {complaint.challanId}
                                    </th>
                                    <td className="px-6 py-4">
                                        {new Date(complaint.createdAt).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-2 py-1 rounded-lg ${getStatusColor(complaint.status)}`}>
                                            {complaint.status}
                                        </span>
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-96">
                                    {complaint.description}
                                </td> */}
                                    <td className="px-6 py-4">
                                        {new Date(complaint.updatedAt).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {complaint.remark}
                                    </td>
                                </tr>
                                {expandedRow === complaint._id && (
                                    <>
                                        <tr>
                                            <td colSpan="5" className="md:hidden px-6 py-4 bg-gray-100 dark:bg-gray-900 text-sm" >
                                                <strong className=" text-sm">challan Id:</strong> {complaint.challanId}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 bg-gray-100 dark:bg-gray-900" >
                                                <strong>Description:</strong> {complaint.description}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5" className="m-[-50vw] px-6 py-4 bg-gray-100 dark:bg-gray-900" >
                                                {complaint.images.length > 0 && <Carousel images={complaint.images} />}
                                            </td>
                                        </tr>
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ComplaintStatus