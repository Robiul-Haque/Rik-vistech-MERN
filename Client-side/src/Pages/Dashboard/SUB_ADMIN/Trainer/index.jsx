import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import Header from '../SENIOR_GL/Header';
import Table from '../SENIOR_GL/Table';
import { useLocation } from 'react-router-dom';


const Trainer_Page = () => {
    const location = useLocation().search;
    const [filters, setFilters] = useState({})
    const { user } = useSelector((state) => state.user)
    useEffect(() => {
        setFilters({
            role: "user",
            "settings.trainer": user?.userId
        })
        if (location) {
            setFilters((prev) => ({
                ...prev,
                status: new URLSearchParams(location).get('status') || 'inactive',
            }));
        }
    }, [user, location])
    return (
        <div className='p-5'>
            <Header
                pageName={"Users"}
                setDates={setFilters}
                user={user?.userId}
                role={"user"}
            />
            <Table filters={filters} pageName={"trainer"} />
        </div>
    );
};

export default Trainer_Page;
