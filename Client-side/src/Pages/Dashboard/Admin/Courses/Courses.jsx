import React, { useState } from 'react';
import CourseCard from '../../../../Components/Card/CourseCard';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../Components/axios/axios.instance';
import Loader from '../../../../Components/Shared/Loader';
import { Button } from '@material-tailwind/react';
import { BlankDialog } from '../../../../Components/Dialog/BlankDialog';
import CourseForm from './_COMP/CourseForm';
import GroupCard from '../../../User/Groups/GroupCard';
import GroupForm from './_COMP/GroupForm';

const Courses_Admin = ({ mode }) => {
    const { data: courses, isLoading, refetch } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const response = await api.get("/courses");
            return response.data;
        }
    })
    const { data: groups, isLoading: isLoadingGroup, refetch: refetchGroup } = useQuery({
        queryKey: ["groups"],
        queryFn: async () => {
            const response = await api.get("/group");
            return response.data;
        }
    })
    const [open, setOpen] = useState(false);

    if (isLoading || isLoadingGroup) {
        return <Loader />
    }
    return (
        <div className='p-5'>
            <h1 className='lg:text-2xl text-xl font-semibold'>{
                mode === "groups" ? "Whatsapp Groups" : "Couses Management"
            }</h1>
            <Button onClick={() => setOpen(true)} className='mt-3'>
                Add New {mode === "groups" ? "Group" : "Course"}
            </Button>
            {
                mode !== "groups" ? <div className="flex-wrap gap-4 flex mt-10">
                    {
                        courses?.filter(course => course?._id !== "66092db02726bc7bb3f9588c")?.map(course => <CourseCard key={course._id} course={course} user="admin" refetch={refetch} />)
                    }
                </div>
                    :
                    <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-3'>
                        {
                            groups?.map(group => <GroupCard key={group._id} title={group.name} link={group.link} mode={"edit"}
                                data={group} refetch={refetchGroup} refetchGroup={refetchGroup}
                            />)
                        }
                    </div>
            }

            <BlankDialog open={open} setOpen={setOpen} >
                {
                    mode === "groups" ? <GroupForm setOpen={setOpen} refetch={refetchGroup} mode={mode} /> : <CourseForm setOpen={setOpen} refetch={refetch} mode={mode} />
                }
            </BlankDialog>
        </div>
    );
};

export default Courses_Admin;