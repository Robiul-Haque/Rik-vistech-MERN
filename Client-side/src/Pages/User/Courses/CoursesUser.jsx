import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loader from '../../../Components/Shared/Loader';
import CourseCard from '../../../Components/Card/CourseCard';
import { api } from '../../../Components/axios/axios.instance';

const CoursesUser = () => {
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
        <div>
            <div className="flex-wrap gap-4 flex mt-10">
                {
                    courses?.filter(course => course?._id !== "66092db02726bc7bb3f9588c")?.map((course, index) => <CourseCard key={course._id} course={course} user="user" refetch={refetch} autoEnrolled={course?._id === "65fb4864f19618b0bbbdebdb"} />)
                }
            </div>
        </div>
    );
};

export default CoursesUser;