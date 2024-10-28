import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { api } from '../../Components/axios/axios.instance';
import { useSelector } from 'react-redux';
import { CardSingleButton } from './Feed/Components/CardSingleButton';
import { SupportTeamCard } from './Feed/Components/SupportTeamCard';
import { NormalCard } from '../../Components/Card/Cards';
import { CardBody } from '@material-tailwind/react';
import { JoinClass } from './Feed/Components/JoinClass';

const Classes = () => {
    const { settings, user } = useSelector(state => state.user)
    const { data: courses, isLoading, refetch } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const response = await api.get("/courses");
            return response.data;
        }
    })
    const [wellcomeCLass, setWellcomeCLass] = React.useState({})
    useEffect(() => {
        if (courses) {
            setWellcomeCLass(courses.find(course => course?._id === "66092db02726bc7bb3f9588c"))
        }
    }, [courses])
    return (
        <div>
            <>
               
                <div className="flex justify-center mt-10">
                    <NormalCard className={"max-w-[450px] w-full border text-black"}>
                        <CardBody>
                            <h1 className='text-center text-xl font-semibold'>
                                Join Live Learning Training Classes BD Time : ( 8am to 10pm)
                            </h1>
                            <h2 className='text-center mt-3 text-lg'>Wellcome Class</h2>
                            <div className='flex justify-center pt-5'>
                                {
                                    wellcomeCLass.meetingId ?
                                        <a className="btn btn-primary"
                                            target="_blank"
                                            rel="noreferrer"
                                            href={wellcomeCLass.meetingId}>Join Class</a>
                                        :
                                        <button className="btn">Join Class</button>
                                }
                            </div>
                        </CardBody>
                    </NormalCard>
                </div>
                <div className="grid grid-cols-2 mt-10 gap-5">
                    {
                        courses?.filter(course => course?._id !== "66092db02726bc7bb3f9588c")?.map((item, index) => (
                            <JoinClass
                                key={index}
                                className={"max-w-[450px] w-full border text-black"}
                                title={item.title}
                                link={item.meetingId}
                                button={"Join Class"}
                            />
                        ))
                    }
                </div>
            </>
        </div>
    );
};

export default Classes;