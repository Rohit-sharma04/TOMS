import { Link } from 'react-router-dom';
import './index.css';
import { useState } from 'react';
import traffic_image from '../src/assets/images/traffic-image.jpg'
function App() {
  const [showRoleOptions, setShowRoleOptions] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white">
      <main className="container mx-auto py-20 px-4 text-center">
        <h2 className="text-5xl font-bold mb-4">Manage Offences Efficiently</h2>
        <p className="text-xl mb-8">
          Track and manage traffic offences seamlessly with our comprehensive system.
        </p>
        <button
          onClick={() => setShowRoleOptions(!showRoleOptions)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300 transform hover:scale-105">
          Select Your Role
        </button>

        {showRoleOptions && (
          <div className="mt-4">
            <Link to="/admin/dashboard">
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 m-2 rounded-full shadow-md transition duration-300 transform hover:scale-105">
                Admin
              </button>
            </Link>
            <Link to="/officer/dashboard">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 m-2 rounded-full shadow-md transition duration-300 transform hover:scale-105">
                Traffic Officer
              </button>
            </Link>
            <Link to="/user/dashboard">
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 m-2 rounded-full shadow-md transition duration-300 transform hover:scale-105">
                User
              </button>
            </Link>
          </div>
        )}
      </main>

      <section className="bg-white py-20 text-gray-900">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-purple-800">Features</h3>
          <div className="flex flex-wrap justify-center">
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold mb-4 text-blue-700">Live Challan Status</h4>
                <p>Monitor the status of your traffic challans in real-time.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold mb-4 text-green-700">Online Challan Payment</h4>
                <p>Pay your traffic challans online with ease and convenience.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold mb-4 text-red-700">Complaint Management</h4>
                <p>File and manage complaints related to your challans.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold mb-4 text-purple-700">Detailed Offence Reports</h4>
                <p>Access detailed reports of offences and challans you need to pay.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 py-20 text-white">
        <div className="container mx-auto">
          <h3 className="md:text-4xl text-2xl font-bold mb-6 text-center">About Our System</h3>
          <div className="flex flex-wrap justify-center">
          <div className="w-full md:w-1/2 p-4">
              <p className="text-lg mb-6">
                The Offence Management System is designed to provide a seamless and efficient solution for managing and tracking traffic offences. 
                Our system offers real-time tracking of challan status, allowing you to stay updated with the latest information on your traffic violations.
              </p>
              <p className="text-lg mb-6">
                With our online challan payment feature, you can conveniently pay your fines without any hassle. The system also allows you to file and manage complaints related to your challans, ensuring that any issues are addressed promptly.
              </p>
              <p className="text-lg">
                Additionally, you can access detailed reports of your offences, helping you keep track of your violation history and payments. 
                Our comprehensive system is designed to cater to the needs of administrators, traffic officers, and users alike, making traffic management more efficient and effective.
              </p>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <img src={traffic_image} alt="Offence Management System" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-purple-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Offence Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

