import { Button, Input } from '@material-tailwind/react';
import React, { useState } from 'react';
import { api } from '../../../Components/axios/axios.instance';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import RequesttableConsult from './RequestTableCons';

const Request = () => {
    const [userId, setUserId] = useState("");
    const [user, setUser] = useState({});

    const findUser = async () => {
        try {
            if (userId) {
                const res = await api.post(`/users/one`, {
                    userId: userId,
                    role: "user",
                    status: "inactive"
                });
                setUser(res.data)

            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <div className='p-5'>
            <h1 className='text-2xl'>Reqest For A Inactive User</h1>
            {
                user?.userId && <ProfileCard user={user} />
            }
            <div className="w-72 mt-10">
                <Input onChange={(e) => setUserId(e.target.value)} label="Userid" />
                <Button className='mt-4' onClick={findUser}>
                    Find
                </Button>
            </div>
            <RequesttableConsult />
        </div>
    );
};

export default Request;

const ProfileCard = ({ user }) => {
    const { user: currentUser } = useSelector((state) => state.user)
    const requestForLead = async () => {
        try {
            const newRequest = {
                requester: currentUser._id,
                user: user._id
            }
            const res = await api.post('/requests', newRequest);
            if (res) {
                toast.success("Request Sent")
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <div >
            <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm bg-white shadow-xl rounded-lg text-gray-900 mt-3 pb-3">
                <div className="rounded-t-lg h-32 overflow-hidden">
                    <img className="object-cover object-top w-full" src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" alt="Mountain" />
                </div>

                <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                    <img className="object-cover object-center h-32" src={user?.image} alt="Woman looking front" />
                </div>
                <div className="text-center mt-2">
                    <h2 className="font-semibold">{user?.firstName + " " + user?.lastName}</h2>
                    <p className="text-gray-500">{user.role}</p>
                </div>
                <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                    <li className="flex flex-col items-center justify-around">
                        <h1>Counselor</h1>
                        <p className='text-xs'>{user?.settings?.consultant}</p>
                    </li>
                    <li className="flex flex-col items-center justify-around">
                        <h1>Phone</h1>
                        <p className='text-xs'>{user?.phone}</p>
                    </li>
                    <li className="flex flex-col items-center justify-around">
                        <h1>Whatsapp</h1>
                        <p className='text-xs'>{user?.whatsapp}</p>
                    </li>
                </ul>
                <div className='px-5'>
                    {
                        currentUser?.userId === user?.settings?.consultant
                            ?
                            <Button className='w-full mt-4'
                                variant='filled'
                                color='green'
                            >
                                It's alrady yours
                            </Button>
                            :
                            <Button onClick={requestForLead} className='w-full mt-4'>
                                Request
                            </Button>
                    }

                </div>
            </div>

        </div>
    );
};
