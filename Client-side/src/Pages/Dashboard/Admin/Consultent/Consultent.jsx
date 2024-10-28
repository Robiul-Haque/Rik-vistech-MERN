import React, { useEffect, useState } from 'react';
import Header from '../Users/Header';
import TableSC from '../SC/TableSC';
import { useLocation } from 'react-router-dom';

const Consultant = () => {
    const [filters, setFilters] = useState({
        role: "consultant"
    })
    const location = useLocation().search;

    useEffect(() => {
        if (location) {
            setFilters((prev) => ({ ...prev, status: new URLSearchParams(location).get('status') || 'inactive' }));
        }
        setFilters((prev) => ({ ...prev, role: 'consultant' }));
    }, [location])
    return (
        <div className='p-5'>
            <Header pageName={"Counselor"} setDates={setFilters} />
            <TableSC filters={filters} />
        </div>
    );
};

export default Consultant;