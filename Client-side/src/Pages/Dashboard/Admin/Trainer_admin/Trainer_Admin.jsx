import React, { useEffect, useState } from 'react';
import Header from '../Users/Header';
import TableSC from '../SC/TableSC';
import { useLocation } from 'react-router-dom';

const Trainer_admin = () => {
    const [filters, setFilters] = useState({
        role: "trainer"
    })
    const location = useLocation().search;

    useEffect(() => {
        setFilters((prev) => ({ ...prev, role: 'trainer' }));
    }, [location])
    return (
        <div className='p-5'>
            <Header pageName={"Trainers"} setDates={setFilters} />
            <TableSC filters={filters} />
        </div>
    );
};

export default Trainer_admin;



// Trainer_admin