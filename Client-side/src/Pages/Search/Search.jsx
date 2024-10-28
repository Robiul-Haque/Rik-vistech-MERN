import { Button, Input } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Profile from '../User/Profile/Profile';
import { api } from '../../Components/axios/axios.instance';
import toast from 'react-hot-toast';

const Search = () => {
    const [user, setUser] = useState(null);
    const { user: currentUser } = useSelector((state) => state.user);
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false);
    const findUser = async () => {
        if (userId && currentUser?.role !== "user") {
            try {
                setLoading(true);
                const res = await api.get(`/users/${userId.includes(" ") ? userId.replace(" ", "") : userId}`);
                setLoading(false);
                setUser(res.data)
            } catch (error) {
                setLoading(false);
                toast.error(error?.response?.data?.message || "Something went wrong");
            }
        }
        else {
            toast.error("Please enter a valid user id");
        }
    }
    return (
        <div className='p-5'>
            <h1 className='text-3xl'>Search a user</h1>
            <div className="max-w-72 mt-5">
                <Input label="Search with userid" value={userId} onChange={(e) => setUserId(e.target.value)} />
                <Button onClick={findUser} style={{ marginTop: "10px" }}>
                    Search
                </Button>
            </div>
            {
                user &&
                <Profile data={user} />
            }
        </div>
    );
};

export default Search;