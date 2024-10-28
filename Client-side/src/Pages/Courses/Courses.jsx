import React from 'react';
import CourseCard from '../../Components/Card/CourseCard';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Components/Shared/Loader';
import { api } from '../../Components/axios/axios.instance';

const Courses = () => {
    const { data: courses, isLoading, refetch } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const response = await api.get("/courses");
            return response.data;
        }
    })

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='container mx-auto py-20 mt-14 px-4'>
            <h1 className='text-5xl text-center'>All Courses</h1>
            <div className="flex flex-wrap gap-7 mt-10 justify-center">
                {
                    courses?.filter(course => course?._id !== "66092db02726bc7bb3f9588c")?.map(course => <CourseCard key={course._id} course={course} refetch={refetch} />)
                }
            </div>
            
        </div>
    );
};

export default Courses;