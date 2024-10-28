import React from 'react';

const FunFact = () => {
    return (
        <div className='container mx-auto py-20 px-5'>
            <h5 className='text-xl font-semibold text-primary uppercase'>Some Fun Fact</h5>
            <h1 className='text-3xl mt-3 font-semibold'>Our Grat Acquire</h1>
            <section className='w-full gap-3 lg:bg-[#edf1f9] mt-10 grid lg:grid-cols-4'>
                <div className='flex flex-col items-center justify-center h-[150px] bg-[#edf1f9] lg:bg-transparent '>
                    <div>
                        <h1 className='text-2xl font-semibold '>105k</h1>
                        <h1 className='text-2xl font-semibold mt-2'>Total Acquire</h1>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center h-[150px] bg-[#edf1f9] lg:bg-transparent '>
                    <div>
                        <h1 className='text-2xl font-semibold '>235k</h1>
                        <h1 className='text-2xl font-semibold mt-2'>Total Student</h1>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center h-[150px] bg-[#edf1f9] lg:bg-transparent '>
                    <div>
                        <h1 className='text-2xl font-semibold '>1000k</h1>
                        <h1 className='text-2xl font-semibold mt-2'>Total Instructor</h1>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center h-[150px] bg-[#edf1f9] lg:bg-transparent '>
                    <div>
                        <h1 className='text-2xl font-semibold '>200k</h1>
                        <h1 className='text-2xl font-semibold mt-2'>Over The World</h1>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FunFact;