import React from 'react';
import { useSelector } from 'react-redux';
import CourseCard from '../../../../Components/Card/CourseCard';

const TeacherManagement = () => {
    const { user } = useSelector((state) => state.user)

    return (
        <div className='p-10'>
            <h1 className='text-3xl mb-5 font-semibold'>Your Course</h1>
            {
                user?.course ?
                    <CourseCard course={user?.course} user={"teacher"} />
                    :
                    <p>No Course Found</p>     
            }

        </div>
    );
};

export default TeacherManagement;