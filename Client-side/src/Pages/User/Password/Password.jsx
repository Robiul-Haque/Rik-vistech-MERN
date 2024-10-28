import { Input } from '@material-tailwind/react';
import React, { useState } from 'react';
import { api } from '../../../Components/axios/axios.instance';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../../redux/features/user/userSlice';

const Password = () => {
    const [values, setValues] = useState({
        password: "",
        newPassword: "",
        rePassword: ""
    })
    const dispatch = useDispatch();
    const updatePassword = async () => {
        try {
            if (values.newPassword.length < 6) {
                return toast.error('Password must be at least 6 characters long');
            }
            if (values.newPassword !== values.rePassword) {
                return toast.error('Passwords do not match');
            }
            if (!values.password) {
                return toast.error('Please enter your current password');
            }
            const response = await api.put('/users/pass', values);
            toast.success(response?.data.message);
            dispatch(logOutUser());
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }
    }
    return (
        <div className='p-10'>
            <Toaster />
            <h1 className='text-xl font-semibold'>Change Your Password</h1>
            <div className='max-w-96 mt-10'>
                <Input
                    onChange={(e) => setValues({ ...values, password: e.target.value })}
                    label="Old Password"
                    success={false}
                    placeholder='Enter Old Password'
                    name='password'
                    type='password'
                />
                <div className="mt-5">
                    <Input
                        onChange={(e) => setValues({ ...values, newPassword: e.target.value })}
                        label="New Password"
                        success={false}
                        placeholder='Enter Old Password'
                    />
                </div>
                <div className="mt-5">
                    <Input
                        onChange={(e) => setValues({ ...values, rePassword: e.target.value })}
                        label="Re Write New Password"
                        success={values.rePassword === values.newPassword}
                        error={values.rePassword !== values.newPassword || values.newPassword.length < 6}
                        placeholder='Enter Old Password'
                    />
                </div>
                <div className="mt-5">
                    <button
                        disabled={values.rePassword !== values.newPassword}
                        onClick={updatePassword}
                        className='w-full disabled:bg-black bg-primary text-white py-2 rounded-lg'>Update Passoword</button>
                </div>
            </div>
        </div>
    );
};

export default Password;