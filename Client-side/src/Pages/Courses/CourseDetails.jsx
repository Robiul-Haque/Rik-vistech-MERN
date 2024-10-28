import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { api } from '../../Components/axios/axios.instance';
import { useParams } from 'react-router-dom';
import Loader from '../../Components/Shared/Loader';
import { imageUrl } from '../../Components/Shared/imageUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CourseDetails = () => {
    const { id } = useParams()
    const { data: courses, isLoading, refetch } = useQuery({
        queryKey: ["course",],
        queryFn: async () => {
            const response = await api.get("/courses/" + id);
            return response.data;
        }
    })

    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='container mx-auto p-5'>
            <div className="lg:grid flex flex-col-reverse grid-cols-2 py-10 items-center">
                <div>
                    <h1 className="lg:text-5xl text-3xl font-bold mt-5 lg:mt-0">{courses?.title}</h1>
                    <p className="py-6">
                        {courses?.description}
                    </p>
                    {
                        courses?.learn &&
                        <>
                            <h1 className='text-xl font-semibold'>
                                📕 What you will learn
                            </h1>
                            <ol className='px-3 mt-5 text-sm'>
                                {
                                    courses?.learn.map((item, index) => (
                                        <li key={index} className='mb-2'>
                                            <span className='mr-2'>
                                                📝
                                            </span> {item}
                                        </li>
                                    ))
                                }
                            </ol>
                        </>
                    }
                </div>
                <div className='flex justify-center'>
                    <img src={imageUrl(courses?.image)} className="max-w-sm rounded-lg shadow-2xl" />
                </div>
            </div>
            <p className='lg:text-center'>
                {courses?.footerDes}
            </p>
        </div>
    );
};

export default CourseDetails;