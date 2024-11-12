'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0/client';
import { RootState } from '@/store/store';
import Loading from '@/app/components/Loading';
import UserTable from '@/app/components/userTable/userTable';
import { useRouter } from 'next/navigation';
import { deleteUser, getAllUsers } from '@/features/user/userSlice';

const Users: React.FC = () => {
  const { isLoading } = useUser();
  const router = useRouter();
  const loading = useSelector((state: RootState) => state.user.loading);
  const allUserData = useSelector((state: RootState) => state.user.getAllUsers);
  const totalPages = useSelector((state: RootState) => state.user.totalPages);
  const currentPage = useSelector((state: RootState) => state.user.currentPage);
  const dispatch = useDispatch();

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchUsers = (page: number, limit: number) => {
    dispatch(getAllUsers({ page, limit }));
  };
  const handleAddUser = () => {
    router.push('/admin/addUser');
  };

  const handleDeleteUser = (id: number) => {
    dispatch(deleteUser({ userId: id }));
  };
  useEffect(() => {
    fetchUsers(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    dispatch(getAllUsers({ page: newPage, limit: itemsPerPage }));
  };

  const handleRecordsPerPageChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    dispatch(getAllUsers({ page: 1, limit: newLimit }));
  };

  if (isLoading || loading) return <Loading />;

  return (
    <div className='flex flex-col h-[calc(100vh-80px)] mt-[80px] p-4'>
      <UserTable
        users={allUserData || []}
        onAddUser={handleAddUser}
        onDeleteUser={handleDeleteUser}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onRecordsPerPageChange={handleRecordsPerPageChange}
      />
    </div>
  );
};

export default Users;
