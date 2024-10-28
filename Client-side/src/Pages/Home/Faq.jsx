import React from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

export function Faq() {
    const [open, setOpen] = React.useState(1);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    return (
        <div className="bg-white text-black py-14  px-4">
            <div className="container mx-auto">
                <h1 className="text-center lg:text-5xl text-2xl font-semibold mb-5">
                    FREQUENTLY ASKED QUESTIONS (F&Q)
                </h1>
                <p className="text-center  lg:text-xl text-base lg:pt-5 pb-10">
                    Answered all frequently asked questions, Still confused?  feel free to contact us.
                </p>
                <Accordion open={open === 1}>
                    <AccordionHeader onClick={() => handleOpen(1)}>
                        What is Dynamic Skillbase platform?
                    </AccordionHeader>
                    <AccordionBody>
                        <p className="text-base">
                            Dynamic Skillbase Platform is a platform where you will be able to enhance your performance through learning As you show your talents on Facebook, Youtbube,Instagram and tiktok etc like that you could able to show your talents in Dynamic Skillbase E-learning Platform as it is a digital marketing platform where you can learn. Besides learning you will be able to improve your work ability or performance.
                        </p>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 2}>
                    <AccordionHeader onClick={() => handleOpen(2)}>
                        Do we need any admission fees ?
                    </AccordionHeader>
                    <AccordionBody>
                        <p className="text-base">
                            Yes you need to pay admission fees for taking the course , product or services.
                        </p>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 3}>
                    <AccordionHeader onClick={() => handleOpen(3)}>
                        Can we do this from the comfort of our home ?
                    </AccordionHeader>
                    <AccordionBody>
                        <div className="text-base">
                            Yes you can take this course or services from your home only because it's is a online process
                        </div>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 4}>
                    <AccordionHeader onClick={() => handleOpen(4)}>
                        What kind of documents and gadgets do we need to do this Course ?
                    </AccordionHeader>
                    <AccordionBody>
                        <div className="text-base">
                            There's not much requirements you will need for doing this Courses you just need an electronic device like a mobile or a laptop, a steady internet connection.
                        </div>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 5}>
                    <AccordionHeader onClick={() => handleOpen(5)}>
                        Is this a part-time or a full-time Work?
                    </AccordionHeader>
                    <AccordionBody>
                        <div className="text-base">
                            It's not a work or its not a job it's only a learning and earning process you need to join here as a learner besides of learning you will be able to earn selling some courses goods or services
                        </div>
                    </AccordionBody>
                </Accordion>
            </div>
        </div>
    );
}