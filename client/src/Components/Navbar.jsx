import { useContext, useState } from 'react';
import { UserContext } from '../Context/UserContext';
import userImage from '../assets/images/user-pic.jpg';
import officerImage from '../assets/images/officer-pic.jpg';
import adminImage from '../assets/images/admin-pic.jpg';
import icon from '../assets/images/traffic-icon.png'

const Navbar = () => {
    const [dropdown, setDropdown] = useState(false);
    const { name, email, role } = useContext(UserContext)

    const toggleDropdown = () => {
        console.log("clicked", dropdown)
        setDropdown((prev) => !prev)
    }
    console.log("role",role)
    // Mapping roles to images
    const roleImages = {
        admin: adminImage,
        officer: officerImage,
        user: userImage
    };
    console.log("image",roleImages[role])
    return (
        <>
            <nav className="bg-white sticky left-0 top-0 z-10 border-gray-200 dark:bg-gray-900">
                <div className=" flex  flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={icon} className="h-8" alt="app Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"> TOMS</span>
                    </div>
                    <div className='relative'>
                        <div className="flex  items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse" onClick={toggleDropdown}>
                            <button type="button" className="flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" >
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 rounded-full" src={roleImages[role]||userImage} alt="user photo" />
                            </button>
                            {/* <!-- Dropdown menu --> */}

                            {dropdown && <div className="z-50 absolute  top-full  right-0 mt-2 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 " id="user-dropdown">
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900 dark:text-white">{name}</span>
                                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">{email}</span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    <li>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                                    </li>
                                </ul>
                            </div>}
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar
