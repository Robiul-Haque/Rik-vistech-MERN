import React, { useEffect, useState } from 'react';
import Header from '../Users/Header';
import TableSC from '../SC/TableSC';

const Teachers = () => {
    const [filters, setFilters] = useState({
        role: "teacher"
    })
    useEffect(() => {
        setFilters({
            role: "teacher"
        })
    },[])
    return (
        <div className='p-5'>
            <Header pageName={"Teachers"} setDates={setFilters} />
            <TableSC filters={filters} isTeacher={true} />
        </div>
    );
};

export default Teachers;