import React, { useEffect, useState } from 'react';
import Header from '../Users/Header';
import TableSC from '../SC/TableSC';
import { useLocation } from 'react-router-dom';

const Checker_admin = () => {
    const [filters, setFilters] = useState({
        role: "checker"
    })
    const location = useLocation().search;

    useEffect(() => {
        setFilters((prev) => ({ ...prev, role: 'checker' }));
    }, [location])
    return (
        <div className='p-5'>
            <Header pageName={"Checker"} setDates={setFilters} />
            <TableSC filters={filters} />
        </div>
    );
};

export default Checker_admin;



