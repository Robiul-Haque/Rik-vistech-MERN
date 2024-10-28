import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { api } from '../../../../Components/axios/axios.instance';
import { Card, Textarea } from '@material-tailwind/react';
import { InputFeild } from '../Components/UserProfileDialog';
import toast from 'react-hot-toast';
import Loader from '../../../../Components/Shared/Loader';

const Notice = () => {

    const { data: notice, isLoading, refetch } = useQuery({
        queryKey: ["notice"],
        queryFn: async () => {
            const response = await api.get("/notice");
            return response.data;
        }
    })
    const createNotice = async (e) => {
        e.preventDefault();
        const text = e.target.text.value;
        try {
            if (text) {
                const res = await api.post("/notice", { text });
                toast.success(res?.data?.message);
                e.target.text.value = "";
                refetch();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    const deleteNotice = async (id) => {
        try {
            const confirm = window.confirm("Are you sure you want to delete this notice?");
            const res = await api.delete(`/notice/${id}`);
            toast.success(res?.data?.message);
            refetch();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='lg:p-5'>
            <h1 className='text-3xl font-semibold'>Notification</h1>

            <form onSubmit={createNotice} className='lg:p-5 mt-5 card shadow-lg'>
                <Textarea
                    label='Write your notice here'
                    name='text'
                />
                <button type='submit' className='btn btn-primary mx-auto mt-5'>
                    Submit
                </button>
            </form>

            <section className='flex flex-col gap-3 mt-5'>
                {
                    notice?.map(notice => <Card key={notice?._id} className='p-5 items-start flex flex-col'>
                        <p className='text-sm'>
                            {(notice?.text).slice(0, 100)}
                        </p>
                        <button onClick={() => deleteNotice(notice?._id)} className='btn mt-3 btn-error text-white btn-xs'>Delete</button>
                    </Card>)
                }
            </section>
        </div>
    );
};

export default Notice;