
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../../Components/axios/axios.instance';
import toast from 'react-hot-toast';
import { refreshUser } from '../../../redux/features/user/userSlice';

const UserDue = () => {
    const { user, wallet } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const payDue = async () => {
        try {
            const response = await api.put('/users/due', { user: user._id });
            toast.success(response?.data.message);
            dispatch(refreshUser(response.data));
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }
    return (
        <div className='text-black w-full pt-5'>
            <h1 className='text-center text-2xl'>Hello {user?.firstName} You have {user?.due}  due</h1>
            <h1 className='text-center text-lg'>Please Pay it to withdraw your balance</h1>
            <div className="flex flex-col items-center font-semibold">
                <h2>
                    Your Account Balance : {user?.balance}</h2>
                <h2 className='mb-5'>
                    Your Due : {user?.due}
                </h2>
                <button
                    disabled={user.balance < user.due}
                    onClick={payDue} className='btn-primary btn disabled:bg-gray-600'>
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default UserDue;