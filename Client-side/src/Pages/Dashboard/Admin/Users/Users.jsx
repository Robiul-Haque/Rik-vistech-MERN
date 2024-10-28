import React, { useEffect, useState } from 'react';
import Header from './Header';
import UsersTable from './UsersTable';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderCon from '../../Consultent/HeaderCOn';


const Users = () => {
    const location = useLocation().search;
    const [dates, setDates] = useState({
    });
    const [statistic, setStatistic] = useState(null);
    const { user } = useSelector((state) => state.user);
    const [users, setUsers] = useState({});
    useEffect(() => {
        if (location) {
            setDates((prev) => ({ ...prev, status: new URLSearchParams(location).get('status') || 'inactive' }));
        }
    }, [location])

    useEffect(() => {
        const date = new Date();
        if (user?.role === "sgl") {
            setDates((prev) => ({ ...prev, role: "user" }))
        }
        else if (user?.role === "gl") {
            setDates((prev) => ({ ...prev, role: "user", "settings.gl": user?.userId, status: "active" }))
        }
        else if (user?.role === "manager") {
            setDates((prev) => ({ ...prev, role: "user", startDate: new Date(date.getFullYear(), date.getMonth(), date.getDate()) }))
        }
        else {
            setDates((prev) => ({ ...prev, role: "user" }))
        }
    }, [user])
    return (
        <div className='p-5'>
            {
                (user?.role === "admin" || user?.role === "gl" || user?.role === "sgl" || user?.role === "manager") && <Header dates={dates} setDates={setDates} statistics={statistic} filters={dates}/>
            }
            {
                user?.role === "consultant" &&
                <HeaderCon data={users} setDates={setDates} />
            }
            <UsersTable filters={dates} setUsers={setUsers} setStatistic={setStatistic}/>
        </div>
    );
};

export default Users;