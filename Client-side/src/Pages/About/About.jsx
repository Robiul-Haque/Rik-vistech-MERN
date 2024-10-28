import React from 'react';
import Statistic from '../Home/Statistic';

const About = () => {
    return (
        <div className='max-w-[900px] mx-auto py-16'>
            <h1 className='lg:text-4xl text-center text-2xl'>ABOUT US</h1>
            <p className='text-start mt-5'>
                Dynamic Skillbase is a Bangladeshi trusted online platform. It is a learning and earning process by using your valuable free time at home through your smart phone only It is a very easy process and you can learn this process on your own mother tongue and you can earn from our community with selling some Courses Services or product also. Here you make your career smoothly.
            </p>
            <p className='text-start mt-6'>
                Dynamic Skillbase is a platform where you will be able to enhance your performance through learning As you show your talents on Facebook, Youtbube,Instagram and TikTok etc like that you could able to show your talents in Dynamic Skillbase E-learning Platform as it is a digital marketing platform where you can learn. Besides learning you will be able to improve your work ability or performance.
            </p>
            <div>
                <Statistic page={'about'}/>
            </div>
        </div>
    );
};

export default About;