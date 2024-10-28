import React, { useEffect, useState } from 'react';
import Header from '../Users/Header';
import TableSC from './TableSC';

const SeniorCnnsultent = () => {
    const [filters, setFilters] = useState({
        role: "sc"
    })
    useEffect(() => {
        setFilters({
            role: "sc"
        })
    },[])
    return (
        <div className='p-5'>
            <Header pageName={"Senior Counselor"} setDates={setFilters} />
            <TableSC role={"sc"} filters={filters} />
        </div>
    );
};

export default SeniorCnnsultent;