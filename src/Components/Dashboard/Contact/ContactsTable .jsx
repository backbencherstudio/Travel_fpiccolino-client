import React, { useEffect, useState } from "react";
import { base_url } from "../../../utils/base_path";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import CustomTable from "../../../Shared/CustomTable";

const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);
  const [columns] = useState({
    firstName: true,
    lastName: true,
    email: true,
    message: true,
    phone: true,
  });
  const [tourDateFilter, setTourDateFilter] = useState("all");

  // Fetch contacts data from the API
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(`${base_url}/api/contact/AllContact`);
        const data = await response.json();
        setContacts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    // <div className="container mx-auto p-4">
    //   <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Contact List</h1>
    //   <div className="overflow-x-auto shadow-md rounded-lg">
    //     <table className="min-w-full bg-white rounded-lg border-collapse">
    //       <thead>
    //         <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm uppercase tracking-wider">
    //           <th className="px-6 py-4 text-left">First Name</th>
    //           <th className="px-6 py-4 text-left">Last Name</th>
    //           <th className="px-6 py-4 text-left">Email</th>
    //           <th className="px-6 py-4 text-left">Phone</th>
    //           <th className="px-6 py-4 text-left">Contact Method</th>
    //           <th className="px-6 py-4 text-left">Message</th>
    //           <th className="px-6 py-4 text-left">Created At</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {contacts.map((contact, index) => (
    //           <tr
    //             key={contact._id}
    //             className={`border-b ${
    //               index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
    //             } hover:bg-gray-100 transition duration-300`}
    //           >
    //             <td className="px-6 py-4 text-gray-700">{contact.firstName}</td>
    //             <td className="px-6 py-4 text-gray-700">{contact.lastName}</td>
    //             <td className="px-6 py-4 text-gray-700">{contact.email}</td>
    //             <td className="px-6 py-4 text-gray-700">
    //               {contact.phone || 'N/A'}
    //             </td>
    //             <td className="px-6 py-4 text-gray-700">
    //               <span
    //                 className={`px-2 py-1 rounded-full text-xs font-semibold ${
    //                   contact.contactMethod === 'email'
    //                     ? 'bg-blue-100 text-blue-600'
    //                     : 'bg-green-100 text-green-600'
    //                 }`}
    //               >
    //                 {contact.contactMethod}
    //               </span>
    //             </td>
    //             <td className="px-6 py-4 text-gray-700">{contact.message}</td>
    //             <td className="px-6 py-4 text-gray-500">
    //               {new Date(contact.createdAt).toLocaleDateString()}
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //     {contacts.length === 0 && (
    //       <p className="text-center py-6 text-gray-500">No contacts available.</p>
    //     )}
    //   </div>
    // </div>
    <div>
      <CustomHeadingDashboard />
      <CustomTable
        tableType={"contact"}
        title={"Contact List"}
        columns={columns}
        data={contacts}
        setDateFilter={setTourDateFilter}
        dateFilter={tourDateFilter}
      />
    </div>
  );
};

export default ContactsTable;
