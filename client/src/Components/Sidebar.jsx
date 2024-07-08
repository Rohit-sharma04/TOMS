import { Link, useLocation, useNavigate } from "react-router-dom"
import icons from "../assets/icons.svg"
import { useState } from "react";
// eslint-disable-next-line react/prop-types
const Sidebar = ({ prop }) => {
    // Define different sets of options based on the user's role
    const location = useLocation();
    const navigate = useNavigate();
    const [isOpen,setIsOpen]=useState(true);

    console.log(location.pathname.split("/")[1])
    const role = location.pathname.split("/")[1];

    const signOutFunction = () => {
        // Remove token from cookies
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/login')
    }

    let options = [];
    if (role === 'user') {
        options = [
            { path: 'dashboard', label: 'Dashboard' },
            { path: 'challan', label: 'Challan' },
            // { path: 'challan-history', label: 'Challan History' },
            { path: 'complaint', label: 'Complaint' },
            { path: 'complaint-status', label: 'Complaint Status' }
        ];
    } else if (role === 'officer') {
        options = [
            { path: 'dashboard', label: 'Dashboard' },
            { path: 'e-challan', label: 'Create Challan' },
            { path: 'challan-status', label: 'Challan Status' },
            { path: 'assigned-complaints', label: 'Assigned Compalints' },
        ];
    } else if (role === 'admin') {
        options = [
            { path: 'dashboard', label: 'Dashboard' },
            { path: 'challan-status', label: 'Challan Status' },
            { path: 'complaint', label: 'Complaint' },
            { path: 'create-officer', label: 'Create Officer' },
            { path: 'officers', label: 'Officer List' },
            { path: 'users', label: 'User List' }
        ];
    }
    return (
        <>                                                                                    
        {/* md:hidden  */}
            <button className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => setIsOpen(prev => !prev)}>
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            {isOpen &&<aside id="default-sidebar"  
            className={`fixed top-16  left-0 z-40 w-64 h-screen transition-transform md:translate-x-0 bg-gray-50    ${isOpen ? 'translate-x-0' : '-translate-x-full'} `}
            // className={`fixed top-16 left-0 z-40 w-64 h-full transition-transform bg-gray-50 dark:bg-gray-800 md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                    aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {options.map((option, index) => (
                            <Link key={index} to={option.path}>
                                <li>
                                    <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 21">
                                            <use xlinkHref={`${icons}#${option.path}`} />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap">{option.label}</span>
                                    </div>
                                </li>
                            </Link>
                        ))}

                        <li>
                            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 21">
                                    <use xlinkHref={`${icons}#sign-out`} />
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap" onClick={signOutFunction}>Sign Out</span>
                            </div>
                        </li>

                    </ul>
                </div>
            </aside>}

            <div className={`p-4  ${isOpen ? 'opacity-50 md:opacity-100 md:ml-64' : 'ml-0'}`} onClick={() => setIsOpen(false)}>
                {prop}
                
            </div>

        </>
    )
}

export default Sidebar
