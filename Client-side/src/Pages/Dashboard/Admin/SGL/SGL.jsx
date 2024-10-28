import React, { useEffect, useState } from 'react';
import Header from '../Users/Header';
import TableSC from '../SC/TableSC';

const SGL = () => {
    const [filters, setFilters] = useState({
        role: "sgl"
    })
    useEffect(() => {
        setFilters({
            role: "sgl"
        })
    },[])
    return (
        <div className='p-5'>
            <Header pageName={"Senior Team Leader"} setDates={setFilters} />
            <TableSC filters={filters} />
        </div>
    );
};

export default SGL;