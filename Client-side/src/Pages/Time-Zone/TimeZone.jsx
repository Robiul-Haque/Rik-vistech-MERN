import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import TableTimeZone from './TableTimeZone';

const TimeZone = () => {
    const [time, setTime] = React.useState("");
    const { user } = useSelector(state => state.user)
    const [filter, setFilter] = React.useState({

    });
    useEffect(() => {
        if (time) {
            setFilter((prev) => ({
                ...prev,
                time: time,

            }))
        }
    }, [time])
    return (
        <div className='p-5'>
            <h1 className='text-3xl  text-gray-800'>Timing Zone</h1>
            <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="select select-md min-w-[200px] mt-5"
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
            <TableTimeZone filters={{ ...filter, role: "user", "settings.consultant": user?.userId, "settings.sendMessage": { "$exists": true }, status: "inactive" }} />
        </div>
    );
};

export default TimeZone;