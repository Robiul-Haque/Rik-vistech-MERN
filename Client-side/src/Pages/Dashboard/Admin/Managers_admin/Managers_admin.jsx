import React, { useEffect, useState } from 'react';
import Header from '../Users/Header';
import TableSC from '../SC/TableSC';
import { useLocation } from 'react-router-dom';

const Manager_admin = () => {
    const [filters, setFilters] = useState({
        role: "manager"
    })
    const location = useLocation().search;

    useEffect(() => {
        setFilters((prev) => ({ ...prev, role: 'manager' }));
    }, [location])
    return (
        <div className='p-5'>
            <Header pageName={"Managers"} setDates={setFilters} />
            <TableSC filters={filters} />
        </div>
    );
};

export default Manager_admin;



