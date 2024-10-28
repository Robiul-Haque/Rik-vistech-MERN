import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className='grid lg:grid-cols-2 grid-cols-1 container mx-auto lg:p-0 p-5'>
            <section
                style={{
                    backgroundImage: 'url(/images/about.png)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
                className='h-[400px] w-full rounded'
            >
            </section>
            <section className='lg:px-10 mt-10 lg:mt-0'>
                <h1 className='text-4xl text-gray-800'>
                    Learn New Skills To Go Ahead For Your Future.
                </h1>
                <p className='mt-5 text-sm text-gray-900'>
                    Welcome to "Vistech E-learning platform," your gateway to acquiring essential skills and knowledge to propel you confidently into the future. In today's rapidly evolving world, the ability to adapt, learn, and grow is more crucial than ever. Whether you're a student preparing for the challenges of tomorrow, a professional seeking to stay ahead in your field, or an individual eager to explore new horizons, this course is designed to equip you with the tools and mindset needed to thrive in an ever-changing landscape.
                </p>
                <div className="flex gap-3 items-center mt-5">
                    <div className="flex flex-col border h-[150px] max-w-[200px] justify-center items-start p-5 text-gray-700 rounded-lg">
                        <h1 className='text-xl font-semibold'>Our Vision</h1>
                        <p className='text-xs text-start mt-2'>
                            Our mission is to empower individuals like you with the skills, knowledge and confidence to achieve their goals.
                        </p>
                    </div>
                    <div className="flex flex-col border h-[150px] max-w-[200px] justify-center items-start p-5 text-gray-700 rounded-lg">
                        <h1 className='text-xl font-semibold'>Our Mission</h1>
                        <p className='text-xs text-start mt-2'>
                            Our vision is to empower individuals to thrive in an ever-evolving world by cultivating a dynamic and versatile skillset.
                        </p>
                    </div>
                </div>
                <Link to={'/courses'} className='btn btn-primary mt-5'>
                    Explore Courses
                </Link>
            </section>
        </div>
    );
};

export default AboutUs;