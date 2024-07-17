import axios from "axios";
import React, { useEffect, useState } from "react";
import Carousel from "../Components/Carousel";
import downArrow from "../assets/double-down-arrow.svg";
import { toast } from "react-toastify";

const AssignedComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [expandedRow, setExpandedRow] = useState(null);
    const [toggleModal, setToggleModel] = useState(false);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [challanDetails, setChallanDetails] = useState(null);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'In Progress':
                return 'bg-blue-100 text-blue-800';
            case 'Resolved':
                return 'bg-green-100 text-green-800';
            case 'Rejected':
                return 'bg-red-100 text-red-800';
            case 'Under Review':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const openModal = (complaint) => {
        console.log("open Modal")
        setSelectedComplaint(complaint);
        setToggleModel(true);
        fetchChallanDetails(complaint.challanId);
    };

    const fetchChallanDetails = async (challanId) => {
        try {
            console.log("fetchChallanDetails", challanId)
            const res = await axios.get(`/api/officer/challan/${challanId}`);
            console.log(res.data.data)
            if (res.data.success) {
                setChallanDetails(res.data.data);
            } else {
                toast.info(res.data.message);
            }
        } catch (error) {
            console.error(`Error fetching challan details: ${error}`);
        }
    };

    const handleUpdateClick = async () => {
        setToggleModel(false);
        try {
            const updatedComplaint = {
                _id: selectedComplaint._id,
                status: selectedComplaint.status,
                remark:selectedComplaint.remark
            };

            const updatedChallan = {
                _id: challanDetails._id,
                // address: challanDetails.address,
                // date: challanDetails.date,
                // time: challanDetails.time,
                // description: challanDetails.description,
                // challanVehicleNumber: challanDetails.challanVehicleNumber,
                fine: challanDetails.fine,
                // status: challanDetails.status,
                // images: challanDetails.images
            };

            const [complaintRes, challanRes] = await Promise.all([
                axios.put("/api/officer/updateComplaint", updatedComplaint),
                axios.put("/api/officer/updateChallan", updatedChallan)
            ]);

            if (complaintRes.data.success && challanRes.data.success) {
                toast.success('Complaint and Challan updated successfully');
                getData();
            } else {
                toast.error('Error updating complaint or challan');
            }
        } catch (error) {
            console.error(`Error updating complaint or challan: ${error}`);
        }
    };

    const getData = async () => {
        try {
            const res = await axios.get("/api/officer/assigned-complaint");
            if (res.data.success) {
                setComplaints(res.data.data);
            } else {
                toast.info(res.data.message);
            }
        } catch (error) {
            console.error(`Error fetching complaints: ${error}`);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const toggleRow = (complaint) => {
        if (expandedRow === complaint._id) {
            setExpandedRow(null);
        } else {
            setExpandedRow(complaint._id);
            fetchChallanDetails(complaint.challanId); // Fetch challan details when a row is expanded
        }
    }

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
                            <th scope="col" className="px-2 pl-3 py-3"></th>
                            <th scope="col" className="px-3 py-3">Vehicle Number</th>
                            <th scope="col" className="px-3 py-3">Recorded On</th>
                            <th scope="col" className="px-3 py-3">Status</th>
                            <th scope="col" className="px-3 py-3">Last Updated</th>
                            <th scope="col" className="px-3 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaints.map((complaint) => (
                            <React.Fragment key={complaint._id}>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" >
                                    <th className="px-2 py-4 " onClick={() => toggleRow(complaint)}>
                                        <img className="min-w-4 max-w-4" src={downArrow} alt="Toggle Details" />
                                    </th>
                                    <th scope="row" className="px-3 py-4 text-xs md:text-base ">
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
                                    <td className="px-3 py-4 text-blue-500 cursor-pointer" onClick={() => openModal(complaint)}>
                                        Edit
                                    </td>
                                </tr>
                                {expandedRow === complaint._id && (
                                    <>
                                        <tr>
                                            <td colSpan="6" className="px-3 py-4 bg-gray-100 dark:bg-gray-900 text-sm" >
                                                <strong>Challan ID:</strong> {complaint.challanId}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="6" className="px-3 py-4 bg-gray-100 dark:bg-gray-900 text-sm" >
                                                <strong>Complaint ID:</strong> {complaint._id}
                                            </td>
                                        </tr>
                                        <tr>

                                            <td colSpan="6" className="px-3 py-4 bg-gray-100 dark:bg-gray-900 text-sm" >
                                                <strong>Complaint Description:</strong> {complaint.description}
                                            </td>
                                        </tr>
                                        <tr>
                                            {console.log(complaint.remark)}
                                            <td colSpan="6" className="px-3 py-4 bg-gray-100 dark:bg-gray-900 text-sm" >
                                                <strong>Remark:</strong> {complaint.remark}
                                            </td>
                                        </tr>
                                        {/* {console.log(complaint.images.length)} */}
                                        {complaint.images.length > 0 && <tr>
                                            <td colSpan="6" className="m-[-50vw] px-3 py-4 bg-gray-100 " >
                                                {complaint.images.length > 0 && <Carousel images={complaint.images} />}
                                            </td>
                                        </tr>}
                                        {challanDetails && (
                                            <tr>

                                                <td colSpan="6" className="px-3 py-4 bg-gray-200 dark:bg-gray-800">
                                                    <h2 className="pb-2 text-lg font-bold">Challan Details -</h2>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <strong>Address: </strong> {challanDetails.address}

                                                        </div>
                                                        <div>
                                                            <strong>Date: </strong> {challanDetails.date}

                                                        </div>
                                                        <div>
                                                            <strong>Time: </strong> {challanDetails.time}

                                                        </div>
                                                        <div>
                                                            <strong>Description: </strong> {challanDetails.description}

                                                        </div>
                                                        <div>
                                                            <strong>Vehicle Number: </strong> {challanDetails.challanVehicleNumber}

                                                        </div>
                                                        <div>
                                                            <strong>Fine: </strong> {challanDetails.fine}
                                                        </div>
                                                    </div>

                                                    {console.log(challanDetails.images)}
                                                    {challanDetails.images && challanDetails.images.length > 0 && (
                                                        <div className="mt-4">
                                                            {console.log(challanDetails.images)}
                                                            <Carousel images={challanDetails.images} />
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {toggleModal && selectedComplaint && challanDetails && (
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
                                <p className="pr-3 font-semibold">Complaint Status: </p>
                                <select value={selectedComplaint.status} onChange={(e) => setSelectedComplaint({ ...selectedComplaint, status: e.target.value })}>
                                    <option value='Pending'>Pending</option>
                                    <option value='In Progress'>In Progress</option>
                                    <option value='Resolved'>Resolved</option>
                                    <option value='Rejected'>Rejected</option>
                                    <option value='Under Review'>Under Review</option>
                                </select>
                            </div>
                            <div className="mt-4">
                                {/* <strong>Challan Details: </strong> */}
                                <div className="mt-2 grid grid-cols-1 gap-4">
                                    <div>
                                        <label>Challan Fine: </label>
                                        <input type="number" value={challanDetails.fine} onChange={(e) => setChallanDetails({ ...challanDetails, fine: e.target.value })} />
                                    </div>

                                    <div>
                                        <label>Complaint Remark: </label>
                                        <textarea className="w-full border-2 border-blue-500 rounded-md" value={selectedComplaint.remark} onChange={(e) => setSelectedComplaint({ ...selectedComplaint, remark: e.target.value })}></textarea>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                                onClick={handleUpdateClick}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AssignedComplaints;
