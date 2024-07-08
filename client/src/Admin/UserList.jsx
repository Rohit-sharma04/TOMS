import axios from "axios";
import { useEffect, useState } from "react";

const UserList = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get("api/admin/users");
            console.log("data", res.data);
            if (res.data.success) {
                setUsers(res.data.data);
            } else {
                alert(res.data.message);
            }
        };
        getData();
    }, [])

    const deleteUser = async (userId) => {
        try {
            const res = await axios.delete(`/api/admin/deleteUser/${userId}`);
            if (res.data.success) {
                alert('User Deleted Successfully')
                const updatedUsers = users.filter(user => user._id !== userId);
                setUsers(updatedUsers);
            } else {
                alert('Could not Delete User')
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:textRight text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="hidden md:block px-6 py-3">
                                user id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                vehicle Number
                            </th>

                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map((user) => (
                            <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" className="hidden md:block px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user._id}
                                </th>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4">
                                    {user.vehicleNumber}
                                </td>

                                <td className="px-6 py-4">
                                    <button className="font-medium text-red-600 dark:text-red-500" onClick={() => deleteUser(user._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                        </svg>

                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UserList
