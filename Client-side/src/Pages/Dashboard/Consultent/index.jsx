import React, { useEffect, useState } from 'react';

import HeaderCon from './HeaderCOn';
import UsersTable from './Table';


// consultent user management
const ConsultantUM = () => {
    const [dates, setDates] = useState({
    });
    const [users, setUsers] = useState({});
    useEffect(() => {
       setDates((prev) => ({...prev, status: "inactive"})) 
    },[])
    return (
        <div className='p-5'>
            <HeaderCon data={users} setDates={setDates} />
            <UsersTable filters={dates} setUsers={setUsers} />
        </div>
    );
};

export default ConsultantUM;

