import axios from "axios";
import React, { useEffect, useState } from "react"
import Carousel from "../Components/Carousel";
import { toast } from "react-toastify";

export const ChallanStatus = () => {
    const [challan, setChallan] = useState();
    const [expandedRow, setExpandedRow] = useState(null);
    const [option, setOption] = useState('Pending');

    useEffect(() => {
        const getData = async () => {
            console.log(option)
            let res = await axios.post("api/officer/challan-status", { option });
            console.log("data", res.data);
            if (res.data.success) {
                setChallan(res.data.data);
            } else {
                toast.info(res.data.message);
            }
        };
        getData();
    }, [option])


    const toggleRow = (id) => {
        if (expandedRow === id) {
            setExpandedRow(null);
        } else {
            setExpandedRow(id);
        }
    };

    const toggleOption = (e) => {
        const opt = e.target.value;
        setOption(opt);
    }


    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex flex-column sm:flexRow flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                    <div>
                        <select className="inline-flex items-center text-gray-500  p-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5" onChange={toggleOption}>
                            <option value='Pending'> Pending Challan</option>
                            <option value='Completed'>Completed Challan</option>

                        </select>
                    </div>
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
                                challan id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Address
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date & Time
                            </th>
                            {/* <th scope="col" className="px-6 py-3 ">
                                Description
                            </th> */}
                            <th scope="col" className="px-6 py-3">
                                Fine
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {challan && challan.map((challan) => (
                            <React.Fragment key={challan._id}>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" onClick={() => toggleRow(challan._id)}>

                                    <th scope="row" className="hidden md:block px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {challan._id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {challan.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        {challan.date} {challan.time}
                                    </td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis max-w-96">
                                    {challan.description}
                                </td> */}
                                    <td className="px-6 py-4">
                                        {challan.fine}
                                    </td>
                                    
                                </tr>


                                {expandedRow === challan._id && (
                                    <>
                                        <tr>
                                            <td colSpan="5" className="md:hidden px-6 py-4 bg-gray-100 dark:bg-gray-900 text-sm" >
                                                <strong className=" text-sm">Challan Id:</strong> {challan._id}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 bg-gray-100 dark:bg-gray-900" >
                                                <strong>Description:</strong> {challan.description}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan="5" className="m-[-50vw] px-6 py-4 bg-gray-100 dark:bg-gray-900" >
                                                <Carousel images={challan.images} />
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

