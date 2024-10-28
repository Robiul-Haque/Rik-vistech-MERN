import React from 'react';
import EventCard from '../../Components/Card/EventCard';

const Events = () => {
    return (
        <div className='lg:py-14 py-10 container mx-auto px-4 md:px-0 text-black'>
            <h1 className='lg:text-2xl text-xl uppercase text-center  font-semibold text-primary'>
                Upcoming Events
            </h1>
            <h1 className='lg:text-4xl text-xl mt-3 font-semibold text-center'>Join With Our Events</h1>
            <div className="flex flex-col md:flex-row justify-center gap-5 items-center mt-10">
                <EventCard
                    title={"Resalling"}
                    desc={"Reselling involves buying products and selling them again for a profit. Resellers can find deals from wholesalers, auctions, or even their own closets. They then list these items on online marketplaces or physical stores to find interested buyers. Success often hinges on finding good deals, strategic pricing, and reaching the right target audience."}
                />
                <EventCard
                    title={"Motivational Speech"}
                    desc={"Motivational speeches ignite the fire within. They remind us of our potential, pushing us to overcome doubt and chase dreams. With powerful words and inspiring stories, they equip us with the courage to face challenges and the resilience to keep going, reminding us that within each of us lies the strength to achieve greatness."}
                />
                <EventCard
                    title={"Facebook Marketing"}
                    desc={"Facebook marketing lets businesses connect with their target audience on a massive platform. It's free to create a business page and share posts, but you can also leverage paid advertising for wider reach. By understanding your audience and crafting engaging content, you can drive brand awareness, generate leads, and boost sales."}
                />
            </div>
        </div>
    );
};

export default Events;