import React from 'react';
import { Link } from 'react-router-dom';
import Lady from './hero-image.png'
const HeroArea = () => {
    return (
        <div className='min-h-[90vh] flex items-center  p-4 lg:p-4 hero-bg'>
            <div className="text-white lg:grid grid-cols-12 lg:mt-20 mt-24 container mx-auto">
                <div className='col-span-7'>
                    <h3 className='text-2xl uppercase text-primary font-semibold'>
                        Education Solution
                    </h3>
                    <h1 className="lg:text-5xl text-2xl   font-semibold mt-5 text-black"
                        style={{ lineHeight: '1.2' }}
                    >
                        Better Learning Feature Starts With Vistech E-learning platform
                    </h1>
                    <p className="lg:py-6 py-4 lg:w-[80%] w-full text-xs lg:text-sm leading-normal text-blue-gray-700">
                        At its core, Vistech E-learning platform harnesses the power of adaptive learning technology to tailor educational experiences to each individual user. Whether you're a student, a professional seeking to upskill, or an entrepreneur looking to expand your knowledge base, Vistech E-learning platform is your personalized pathway to success.
                    </p>
                    <div className="flex gap-5">
                        <Link to={'/courses'} className="btn btn-primary px-6">
                            Explore Courses
                        </Link>
                    </div>
                </div>
                <div className='col-span-5'>
                    <img src={Lady} alt="" />
                </div>
            </div>
        </div >
    );
};

export default HeroArea;