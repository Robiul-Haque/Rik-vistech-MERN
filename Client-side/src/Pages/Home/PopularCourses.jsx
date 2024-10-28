import React from 'react';
import CourseCard from '../../Components/Card/CourseCard';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Components/Shared/Loader';
import { api } from '../../Components/axios/axios.instance';
import { Link } from 'react-router-dom';

const PopularCourses = () => {
    const { data: courses, isLoading, refetch } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const response = await api.get("/courses");
            return response.data;
        }
    })
    if (isLoading) {
        return <Loader />;
    }
    return (
        <div className='py-14 lg:px-0 px-4 container mx-auto'>
            <h5 className='lg:text-xl text-lg text-primary leading-normal text-center font-semibold mt-3'>POPULAR COURSES</h5>
            <h1 className='lg:text-3xl text-2xl text-center font-semibold'>Choose Our Best Courses</h1>
            <p className='text-sm text-center mt-3'>
                So, I encourage you to take the first step towards unlocking your potential today. Explore our course catalog, <br /> choose the courses that resonate with you, and embark on a journey of growth, discovery, and success with Vistech E-learning platform.
            </p>
            <div className="flex flex-wrap justify-center gap-10 mt-10">
                {
                    courses?.filter(course => course?._id !== "66092db02726bc7bb3f9588c")?.map(course => <CourseCard key={course._id} course={course} refetch={refetch} />)
                }
            </div>
            <div className='flex justify-center items-center  mt-10'>
                <Link to={'/courses'} className='btn btn-primary'>
                    View All Courses
                </Link>
            </div>
        </div>
    );
};

export default PopularCourses;