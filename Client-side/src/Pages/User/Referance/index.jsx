import React, { useEffect, useState } from 'react';
import ReferanceTable from './Table';
import Header from './Header';
import { useLocation } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux';

const Referance = () => {
    const location = useLocation().search;
    const [dates, setDates] = useState({});
    const [statistic, setStatistic] = useState({})
    const { user } = useSelector((state) => state.user)
    useEffect(() => {
        if (location) {
            setDates((prev) => ({
                ...prev,
                status: new URLSearchParams(location).get('status')
            }));
        }
    }, [location])
    useEffect(() => {
        setDates((prev) => ({
            ...prev,
            reference: user?.userId,
            role: "user",
        }));
    }, [user]);

    return (
        <div className='p-5'>
            <Header
                filters={dates}
                setDates={setDates}
                statistic={statistic}
            />
            <Button size='sm' className='mt-3'>Search</Button>
            <ReferanceTable filters={dates} setStatistics={setStatistic} />
        </div>
    );
};

export default Referance;