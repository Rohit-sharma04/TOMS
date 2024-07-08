import axios from "axios";
import React, { useEffect, useState } from "react"
import Carousel from "../Components/Carousel";
import downArrow from "../assets/double-down-arrow.svg"
const Complaint = () => {

    const [complaints, setComplaints] = useState();
    const [expandedRow, setExpandedRow] = useState(null);
    const [toggleModal, setToggleModel] = useState(false)
    const [selectedComplaint, setSelectedComplaint] = useState(null)

    const getStatusColor = (status) => {
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

    const openModel = (complaint) => {
        setToggleModel(true);
        setSelectedComplaint(complaint)
    }

    const handleUpdateClick=async(selectedComplaint)=>{
        setToggleModel(false)
        console.log("selectedComplaint",selectedComplaint)
        const updatedData = {
            _id: selectedComplaint._id,
            status: selectedComplaint.status,
            assignedOfficerEmail: selectedComplaint.assignedOfficerEmail
        };
    
        try {
            let res = await axios.put("api/admin/updateComplaint", updatedData);
            console.log("data", res.data);
            if (res.data.success) {
                alert('Complaint updated successfully');
                getData();
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(`Error : ${error}`)
        }
    }
    
    const getData = async () => {
        let res = await axios.get("api/admin/complaint");
        console.log("data", res.data);
        if (res.data.success) {
            console.log("complaints data",res.data.data)
            setComplaints(res.data.data);
        } else {
            alert(res.data.message);
        }
    };
    useEffect(() => {
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
                            <th scope="col" className="px-2 pl-3 py-3">

                            </th>
                            <th scope="col" className="px-3 py-3">
                                vehicle Number
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Recorded On
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-3 py-3 ">
                                Last Updated
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Assigned Officer
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints && complaints.map((complaint) => (
                            <React.Fragment key={complaint._id}>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                                    <th className="px-2  py-4 " onClick={() => toggleRow(complaint._id)}>
                                        <img className="min-w-4 max-w-4" src={downArrow} />
                                    </th>
                                    <th scope="row" className=" px-3 py-4 text-xs md:text-base ">
                                        {complaint.complaintVehicleNumber}
                                    </th>
                                    <td className="px-3 py-4">
                                        {new Date(complaint.createdAt).toLocaleString()}
                                    </td>
                                    <td className="px-3 py-4">
                                        <span className={`inline-block px-2 py-1 rounded-lg ${getStatusColor(complaint.status)}`}>
                                            {complaint.status}
                                        </span>
                                    </td>
                                    <td className="px-3 py-4">
                                        {new Date(complaint.updatedAt).toLocaleString()}
                                    </td>
                                    {console.log("complaint.assignedTo",complaint.assignedTo)}
                                    <td className="px-3 py-4">
                                        {complaint.assignedTo?.email ? complaint.assignedTo?.email : "none"}
                                    </td>
                                    <td className="px-3 py-4 text-blue-500 cursor-pointer" onClick={() => openModel(complaint)}>
                                        Edit
                                    </td>
                                </tr>
                                {expandedRow === complaint._id && (
                                    <>
                                        <tr>
                                            <td colSpan="7" className=" px-3 py-4 bg-gray-100 dark:bg-gray-900 text-sm" >
                                                <strong className=" text-sm">challan Id:</strong> {complaint.challanId}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="7" className="px-3 py-4 bg-gray-100 dark:bg-gray-900 text-sm" >
                                                <strong className=" text-sm">complaint Id:</strong> {complaint._id}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="7" className="px-3 py-4 bg-gray-100 dark:bg-gray-900" >
                                                <strong>Complaint Description:</strong> {complaint.description}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="7" className="m-[-50vw] px-3 py-4 bg-gray-100 dark:bg-gray-900" >
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

            {/* Modal */}
            {toggleModal && (
                <div className="fixed top-0 left-0 z-50 w-full h-full overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg w-96">
                        <div className="flex justify-between p-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold">{selectedComplaint.complaintVehicleNumber}</h2>
                            <button className="text-gray-500 hover:text-gray-700" onClick={() => setToggleModel(false)}>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4">
                            <div className="flex">
                                <p className="pr-3 font-semibold">Complaint Status:  </p>
                                <select value={selectedComplaint.status} onChange={(e) => setSelectedComplaint({ ...selectedComplaint, status: e.target.value })}>
                                    <option value='Pending'>Pending</option>
                                    <option value='In Progress'>In Progress</option>
                                    <option value='Resolved'>Resolved</option>
                                    <option value='Rejected'>Rejected</option>
                                    <option value='Under Review'>Under Review</option>
                                </select>
                            </div>
                            {selectedComplaint.assignedTo?.email === undefined && (
                                <input
                                    type="text"
                                    placeholder="Assigned Officer Email"
                                    value={selectedComplaint.assignedOfficerEmail || ''}
                                    onChange={(e) => setSelectedComplaint({ ...selectedComplaint, assignedOfficerEmail: e.target.value })}
                                    className="block w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                            )}
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                onClick={() => handleUpdateClick(selectedComplaint)}
                            >
                                Update
                            </button>


                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Complaint