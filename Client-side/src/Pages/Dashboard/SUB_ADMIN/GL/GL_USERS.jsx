import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HeaderCon from '../../Consultent/HeaderCOn';
import UsersTable from '../../Admin/Users/UsersTable';
import Header from './Header';



const GL_USERS = () => {
    const location = useLocation().search;
    const { user } = useSelector((state) => state.user);
    const [dates, setDates] = useState({
    });
    const [users, setUsers] = useState(null);
    useEffect(() => {
        setDates((prev) => ({ ...prev, "role": "trainer" }))
    }, [location, user])

    return (
        <div className='p-5'>
            {
                <Header setDates={setDates} statistic={users} />
            }
            <UsersTable filters={dates} setUsers={setUsers} />
        </div>
    );
};

export default GL_USERS;