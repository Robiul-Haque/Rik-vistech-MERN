
import React from 'react';
import StatisticCard from '../../Components/Card/StatisticCard';

const Statistic = ({ page }) => {
    return (
        <div className={`${page ? "mt-10" : "bg-white "} py-5 min-h-[200px] px-4 md:px-0`}>
            <div className="container mx-auto relative">
                <div className={`flex lg:flex-row flex-col ${page ? "" : "lg:absolute"} top-[-80px] left-0 right-0 items-center justify-center lg:gap-10 gap-5`}>
                    <StatisticCard
                        text={"Best Education"}
                        desc={"Lifelong learning, critical thinking, ignites curiosity, opens doors."}
                        icon={'/images/icons/books.png'}
                        link={'/courses'}
                    />
                    <StatisticCard
                        text={"Expert Teachers"}
                        desc={"Inspiring minds, igniting curiosity, shaping futures."}
                        icon={'/images/icons/avatar.png'}
                    />
                    <StatisticCard
                        text={"Team Work"}
                        desc={"A team of dedicated educators, with a passion for teaching."}
                        icon={'/images/icons/time.png'}
                    />
                    <StatisticCard
                        text={"Life Time Access"}
                        desc={"Unlimited access, yours for as long as you live."}
                        icon={'/images/icons/time.png'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Statistic;



