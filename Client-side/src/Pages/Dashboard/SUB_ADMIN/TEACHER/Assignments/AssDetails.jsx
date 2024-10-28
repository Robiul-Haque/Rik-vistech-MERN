import moment from 'moment';
import React from 'react';
import toast from 'react-hot-toast';
import { api } from '../../../../../Components/axios/axios.instance';

const AssDetails = ({ assgnment, refetch, setOpen }) => {
    const assignmentHandler = async (type) => {
        try {
            if (type === "accepted") {
                const res = await api.put(`/assignment/${assgnment?._id}`, {
                    status: "accepted",
                })
                toast.success("Updated Successfully")
                refetch()
                setOpen(false)
            }
            else {
                const confirm = window.confirm("Are you sure you want to delete this assignment?")
                if (!confirm) return;
                const res = await api.delete(`/assignment/${assgnment?._id}`)
                toast.success("Deleted Successfully")
                refetch()
                setOpen(false)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong" + error.message)
            setOpen(false)
        }
    }
    return (
        <div className='p-2 text-black'>
            <h1 className='text-center text-2xl'>Assignment Details</h1>
            <div className="grid grid-cols-2 mt-5 px-5 gap-2">
                <Row
                    value={assgnment?.student.firstName + " " + assgnment?.student.lastName}
                    title="Name"
                />
                <Row
                    value={assgnment?.student.userId}
                    title="UserId"
                />
                <Row
                    value={assgnment?.course?.title}
                    title="Course Name"
                />
                <div>
                    <h1 className='font-semibold'>Submition Time</h1>
                </div>
                <div>
                    <h1 >{moment(assgnment?.createdAt).format("LLL")}</h1>
                </div>
                <div>
                    <h1 className='font-semibold'>View Photo</h1>
                </div>
                <div>
                    <a href={assgnment?.assignment} target='_blank' rel="noreferrer" className='btn btn-sm btn-primary'>
                        View Photo
                    </a>
                </div>
                <div>
                    <h1 className='font-semibold'>Action</h1>
                </div>
                <div className='flex items-center gap-2'>
                    {
                        assgnment?.status === "accepted" ? <button
                            className='btn btn-sm btn-success text-white'>
                            Accepted
                        </button>
                            :
                            <>
                                <button
                                    onClick={() => assignmentHandler("accepted")}
                                    className='btn btn-sm btn-success text-white'>
                                    Accept
                                </button>
                                <button
                                    onClick={() => assignmentHandler("rejected")}
                                    className='btn btn-sm btn-error text-white'>
                                    Reject
                                </button>
                            </>
                    }

                </div>
            </div>
        </div>
    );
};

export default AssDetails;

const Row = ({ value, title }) => {
    return <>
        <div>
            <h1 className='font-semibold'>{title}</h1>
        </div>
        <div>
            <h1 >{value}</h1>
        </div>
    </>
}