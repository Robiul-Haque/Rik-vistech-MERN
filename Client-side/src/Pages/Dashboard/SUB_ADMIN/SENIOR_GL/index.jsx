import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import Header from './Header';
import Table from './Table';

const SENIOR_GL = () => {

    const [filters, setFilters] = useState({
        role: "gl"
    })
    const { user } = useSelector((state) => state.user);
    
    useEffect(() => {
        setFilters({
            role: "gl",
            "settings.sgl": user?.userId
        })
    }, [user])
    return (
        <div className='p-5'>
            <Header
                pageName={"Team Leaders"}
                setDates={setFilters}
                user={user?.userId}
                role={"gl"}
            />
            <Table filters={filters} pageName={"sgl"} />
        </div>
    );
};

export default SENIOR_GL;
