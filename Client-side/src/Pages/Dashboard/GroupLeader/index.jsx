import React, { useEffect, useState } from 'react';
import Header from '../Admin/Users/Header';
import TableSC from '../Admin/SC/TableSC';

const GroupLeaders = () => {
    const [filters, setFilters] = useState({
        role: "gl"
    })
    useEffect(() => {
        setFilters({
            role: "gl"
        })
    },[])
    return (
        <div className='p-5'>
            <Header pageName={"Team Leaders"} setDates={setFilters} />
            <TableSC filters={filters} setFilters={setFilters} />
        </div>
    );
};

export default GroupLeaders;