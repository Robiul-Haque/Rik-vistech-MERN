import { Card, button } from '@material-tailwind/react';
import React from 'react';
import GroupForm from '../../Dashboard/Admin/Courses/_COMP/GroupForm';
import { BlankDialog } from '../../../Components/Dialog/BlankDialog';
import { api } from '../../../Components/axios/axios.instance';
import toast from 'react-hot-toast';

const GroupCard = ({ title, link, mode, data, refetch , refetchGroup }) => {
    const [edit, setEdit] = React.useState(false);
    const deleteCourse = async () => {
        try {
            await api.delete(`/group/${data._id}`);
            refetch && refetch();
            toast.success("Group deleted successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    return (
        <Card className='p-5 flex flex-col items-center text-gray-900 w-full'>
            <h1 className='lg:text-xl text-base font-semibold'>{title}</h1>
            <h2 className='mt-1 lg:text-base text-xs '>
                Whatsapp Group
            </h2>
            {
                mode === "edit" ?
                    <div className='flex justify-between w-full'>
                        <button
                            onClick={() => setEdit(!edit)}
                            className='btn-primary btn btn-sm mt-3'>Edit</button>
                        <button
                            onClick={() => deleteCourse()}
                            className='btn-error text-white btn btn-sm mt-3'>Delete</button>
                    </div>
                    :
                    <a href={link} target='_blank' rel="noreferrer" className='btn-primary btn btn-sm mt-3'>Join Now</a>
            }
            <BlankDialog open={edit} setOpen={setEdit} >
                <GroupForm course={data} setOpen={setEdit} refetch={refetch} mode={"edit"} />
            </BlankDialog>
        </Card>
    );
};

export default GroupCard;