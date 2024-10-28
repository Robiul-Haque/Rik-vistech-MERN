import React, { useEffect, useState } from 'react';
import { api } from '../../../Components/axios/axios.instance';
import toast from 'react-hot-toast';

const SetTime = ({ user }) => {
    const [time, setTime] = React.useState(null);
    const [date, setDate] = useState("");
    const updateUser = async () => {
        if (time) {
            try {
                const res = await api.put(`/users/update/${user?._id}`, {
                    time,
                });
                toast.success("Time set successfully")
            } catch (error) {
                toast.error(error?.response?.data?.message || "Something went wrong");
            }
        }
    }
    useEffect(() => {
        if (user.time) {
            setTime(user.time);
        }
    }, [user])
    useEffect(() => {
        const date = new Date();
        setDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    }, [])
    return (
        <div className='flex flex-col max-w-[130px] pt-2'>
            <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="select select-xs mb-2"
            >
                <option value="">Select Time</option>
                <option value="1AM">1Am</option>
                <option value="2AM">2Am</option>
                <option value="3AM">3Am</option>
                <option value="4AM">4Am</option>
                <option value="5AM">5Am</option>
                <option value="6AM">6Am</option>
                <option value="7AM">7Am</option>
                <option value="8AM">8Am</option>
                <option value="9AM">9Am</option>
                <option value="10AM">10Am</option>
                <option value="11AM">11Am</option>
                <option value="12AM">12Am</option>
                <option value="1PM">1Pm</option>
                <option value="2PM">2Pm</option>
                <option value="3PM">3Pm</option>
                <option value="4PM">4Pm</option>
                <option value="5PM">5Pm</option>
                <option value="6PM">6Pm</option>
                <option value="7PM">7Pm</option>
                <option value="8PM">8Pm</option>
                <option value="9PM">9Pm</option>
                <option value="10PM">10Pm</option>
                <option value="11PM">11Pm</option>
                <option value="12PM">12Pm</option>
            </select>
            <button className='btn btn-xs btn-primary' onClick={updateUser}>Update</button>
        </div>
    );
};

export default SetTime;