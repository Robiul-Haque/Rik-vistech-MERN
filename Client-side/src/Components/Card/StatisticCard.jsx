import { useNavigate } from 'react-router-dom';
import React from 'react';

const StatisticCard = ({ text, icon, desc, link }) => {
    const navigate = useNavigate();
    const goTO = () => {
        navigate('/courses');
    }
    return (
        <div className='hero-bg rounded min-h-[130px] py-5 lg:w-[300px] w-full flex flex-col items-center justify-center px-7 cursor-pointer text-gray-800'>
            <h1 className='text-xl font-semibold'>{text}</h1>
            <p className='text-sm text-center mt-1'>{desc}</p>
            <button onClick={goTO} className='btn btn-primary mt-4 btn-sm'>
                Explore Courses
            </button>
        </div>
    );
};

export default StatisticCard;