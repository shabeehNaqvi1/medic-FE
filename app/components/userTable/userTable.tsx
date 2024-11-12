import React from 'react';
import { FiUserPlus, FiTrash2 } from 'react-icons/fi';

interface User {
  _id: string;
  firstName: string;
  email: string;
  role: string;
}

interface UserTableProps {
  users: User[];
  onAddUser: () => void;
  onDeleteUser: (userId: string) => void;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onRecordsPerPageChange: (limit: number) => void;
  totalPages: number;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onAddUser,
  onDeleteUser,
  currentPage,
  itemsPerPage,
  onPageChange,
  onRecordsPerPageChange,
  totalPages, // Get the total number of pages
}) => {
  // Calculate page numbers based on the total pages
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className='p-6 bg-white shadow-lg rounded-lg border border-gray-200'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold text-green-90'>User Management</h2>
        <button
          onClick={onAddUser}
          className='group relative flex items-center gap-2 bg-white text-black py-2 px-5 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:px-8'
        >
          <div className='absolute inset-0 bg-black w-0 group-hover:w-full transition-all duration-500 ease-in-out' />
          <FiUserPlus className='text-lg z-10 transition-colors duration-300 group-hover:text-white' />
          <span className='font-medium z-10 transition-colors duration-300 group-hover:text-white'>
            Add User
          </span>
        </button>
      </div>
      <div className='overflow-x-auto rounded-lg'>
        <div className='max-h-96 overflow-y-auto'>
          {/* Scrollable container */}
          <table className='table w-full border-collapse'>
            <thead className='bg-green-90 text-white'>
              <tr>
                <th className='text-left p-4 font-semibold'>#</th>
                <th className='text-left p-4 font-semibold'>Name</th>
                <th className='text-left p-4 font-semibold'>Email</th>
                <th className='text-left p-4 font-semibold'>Role</th>
                <th className='text-left p-4 font-semibold'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className='border-b hover:bg-gray-100 transition-colors'
                >
                  <td className='py-4 px-6 text-gray-800'>
                    {currentPage === 1
                      ? index + 1
                      : (currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className='py-4 px-6 text-gray-800'>{user.firstName}</td>
                  <td className='py-4 px-6 text-gray-800'>{user.email}</td>
                  <td className='py-4 px-6 text-gray-800'>{user.role}</td>
                  <td className='py-4 px-6'>
                    <button
                      className='text-error hover:text-error-focus p-2 rounded-full transition-transform transform hover:scale-110'
                      onClick={() => onDeleteUser(user['_id'])}
                    >
                      <FiTrash2 className='text-lg' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!users.length && (
            <div className='text-center mt-2'>No Data Found</div>
          )}
        </div>
      </div>

      <div className='flex justify-between items-center mt-4'>
        <div className='flex gap-2 items-center'>
          <span className='text-gray-600'>Records per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onRecordsPerPageChange(Number(e.target.value))}
            className='py-2 px-3 border rounded-md text-gray-800'
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>

        <nav>
          <ul className='flex gap-2'>
            <li>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className='px-4 py-2 rounded-lg bg-white text-black border border-gray-300 hover:bg-green-90 hover:text-white transition-all disabled:opacity-50'
              >
                &lt; Prev
              </button>
            </li>
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => onPageChange(number)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === number
                      ? 'bg-green-90 text-white'
                      : 'bg-white text-black'
                  } border border-gray-300 hover:bg-green-90 hover:text-white transition-all`}
                >
                  {number}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className='px-4 py-2 rounded-lg bg-white text-black border border-gray-300 hover:bg-green-90 hover:text-white transition-all disabled:opacity-50'
              >
                Next &gt;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default UserTable;
