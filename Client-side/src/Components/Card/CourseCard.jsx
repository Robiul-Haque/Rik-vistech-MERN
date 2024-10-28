import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { imageUrl } from '../Shared/imageUrl';
import toast from 'react-hot-toast';
import { api } from '../axios/axios.instance';
import { BlankDialog } from '../Dialog/BlankDialog';
import CourseForm from '../../Pages/Dashboard/Admin/Courses/_COMP/CourseForm';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import { refreshUser } from '../../redux/features/user/userSlice';

const CourseCard = ({ user, course, refetch, autoEnrolled }) => {
    const { user: currentUser } = useSelector(state => state.user)

    const [isExists, setIsExists] = useState(false);

    useEffect(() => {
        if (course && currentUser) {
            setIsExists(currentUser?.courses?.some(c => c.id === course?._id))
        }
    }, [course, currentUser])
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const updateCourse = async (e) => {
        e.preventDefault();
        const meetingId = e.target.meetingId.value;
        try {
            if (!meetingId.includes("https://")) {
                return toast.error("Please enter a valid meeting link");
            }
            const res = await api.put(`/courses/${course?._id}`, { meetingId });
            if (res) {
                toast.success("Course updated successfully");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    const enrollUser = async () => {
        try {
            const res = await api.put(`/users/update/${currentUser?._id}`, {
                courses: [...currentUser?.courses || [], {
                    id: course?._id,
                    status: "enrolled"
                }]
            });
            if (res) {
                toast.success("User enrolled successfully");
                dispatch(refreshUser(res.data));
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    const deleteCourse = async () => {
        const confirm = window.confirm("Are you sure you want to delete this course?");
        if (!confirm) return;
        try {
            const res = await api.delete(`/courses/${course?._id}`);
            if (res) {
                toast.success("Course deleted successfully");
                refetch();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    const [edit, setEdit] = React.useState(false);

    if (user === "admin") {
        return (
            <div className="card rounded overflow-hidden lg:max-w-[380px] h-[380px] w-full bg-base-100 shadow-xl relative border ">
                <img
                    className='w-full h-[270px]'
                    src={imageUrl(course?.image)}
                    alt=""
                />
                <div className='p-3 bg-white absolute bottom-0 w-full card-action'>
                    <h1 className="text-2xl text-center text-gray-900 font-semibold">{course?.title}</h1>
                    <div className="flex items-center justify-between mt-2">
                        <button className='btn btn-sm  btn-primary mx-auto block mt-2' onClick={() => setEdit(true)}>Edit Course</button>
                        <button className='btn btn-sm  btn-error text-white mx-auto block mt-2'
                            onClick={deleteCourse}
                        >Delete Course</button>
                    </div>
                </div>
                <BlankDialog open={edit} setOpen={setEdit} >
                    <CourseForm course={course} setOpen={setEdit} refetch={refetch} mode={"edit"} />
                </BlankDialog>
            </div>
        );
    }
    else if (user === "teacher") {
        return (
            <div className="card rounded overflow-hidden lg:max-w-[380px] h-[380px] w-full bg-base-100 shadow-xl relative border">
                <img
                    className='w-full h-[270px]'
                    src={imageUrl(course?.image)}
                    alt=""
                />
                <div className='p-3 bg-white absolute bottom-0 w-full card-action'>
                    <h1 className="text-2xl text-center text-gray-900 font-semibold">{course?.title}</h1>
                    <form onSubmit={updateCourse} className="flex flex-col mt-2">
                        <Input name='meetingId' label="Update Meet Link" defaultValue={course?.meetingId} />
                        <button type='submit' className='btn btn-sm  btn-primary mx-auto block mt-2'>
                            Update
                        </button>
                    </form>
                </div>
            </div>
        );
    }
    else if (user === "user") {
        return (
            <div className="card rounded overflow-hidden lg:max-w-[380px] h-[380px] w-full bg-[#e1f3e8] shadow-xl relative border">
                <img
                    className='w-full h-[270px]'
                    src={imageUrl(course?.image)}
                    alt=""
                />
                <div className='p-3 bg-white absolute bottom-0 w-full card-action'>
                    <h1 className="text-2xl text-center text-gray-900 font-semibold">{course?.title}</h1>
                    <div className="flex justify-between items-center mt-2">
                        {
                            (!isExists && !autoEnrolled) ?
                                <button type='submit' className='btn btn-sm  btn-primary mx-auto block mt-2'
                                    onClick={enrollUser}
                                >
                                    Enroll
                                </button>
                                :
                                <Link to={`${course?._id}`} className='mx-auto'>
                                    <button className='btn btn-sm  btn-primary mx-auto block mt-2'>
                                        Continue Course
                                    </button>
                                </Link>
                        }
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="card rounded overflow-hidden lg:max-w-[380px] h-[390px] w-full bg-[#e1f3e8] p-3 shadow-xl relative border justify-between">
            <button
                onClick={() => navigate(`/courses/${course?._id}`)}
                className='btn btn-sm  btn-secondary   absolute'>
                ${course?.price}
            </button>
            <img
                className='w-full max-h-[250px] min-h-[250px] bg-white rounded-lg'
                src={imageUrl(course?.image)}
                alt=""
            />
            <div className='p-3 bg-white h-[100px] flex justify-center flex-col w-full card-action mt-3 cursor-pointer rounded hover:shadow-xl'
                onClick={() => navigate(`/courses/${course?._id}`)}
            >
                <h1 className="text-2xl text-center text-gray-900 font-semibold">{course?.title}</h1>
                <div className="flex items-center justify-between mt-2">
                    {
                        user === "user" ?
                            <>
                                {
                                    course?.meetingId?.includes("https://") ?
                                        <Link to={`/courses/${course?._id}`} className='mx-auto'>
                                            <button className='btn btn-sm  btn-primary mx-auto block mt-2'>
                                                Join Class
                                            </button>
                                        </Link>
                                        :
                                        <Link to={`/courses/${course?._id}`} className='mx-auto'>
                                            <button className='btn btn-sm  btn-primary mx-auto block mt-2'>
                                                View Details
                                            </button>
                                        </Link>
                                }
                            </>
                            :
                            // <Link to={`/courses/${course?._id}`} className='mx-auto'>
                            //     <button className='btn btn-sm  btn-primary mx-auto block mt-2'>
                            //         View Details
                            //     </button>
                            // </Link>
                            null
                    }
                </div>
            </div>
        </div>
    );
};

export default CourseCard;