import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { api } from '../../../Components/axios/axios.instance';
import Loader from '../../../Components/Shared/Loader';
import { useParams } from 'react-router-dom';
import CourseCard from '../../../Components/Card/CourseCard';
import { Input } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import AssignmentHistory from './AssignmentHistory';

const CourseSingleDetails = () => {
    const { id } = useParams()
    const { user } = useSelector((state) => state.user)
    const { data: courses, isLoading, refetch } = useQuery({
        queryKey: ["course", id],
        queryFn: async () => {
            const response = await api.get("/courses/" + id);
            return response.data;
        }
    })
    const { data: assignments, isLoading: assignmentsLoading, refetch: refetchAssignments } = useQuery({
        queryKey: ["assignments", courses?._id, user?._id],
        queryFn: async () => {
            const response = await api.post("/assignment/get", {
                course: courses?._id,
                student: user?._id
            });
            return response.data;
        }
    })

    const submitAssignment = async (e) => {
        e.preventDefault()
        const link = e.target.link.value
        if (!link) {
            return toast.error("Please enter a link");
        }
        const newAssignment = {
            course: courses?._id,
            student: user?._id,
            assignment: link
        }
        try {
            const response = await api.post("/assignment", newAssignment)
            toast.success("Assignment submitted successfully")
            refetchAssignments()
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
        }

    }
    const [lastSubmit, setLastSubmit] = React.useState(false)
    useEffect(() => {
        if (assignments) {
            // Get the current time
            const currentTime = new Date();

            // Calculate the time 24 hours ago
            const twentyFourHoursAgo = new Date(currentTime.getTime() - 24 * 60 * 60 * 1000);

            // Convert assignment's createdAt to a Date object
            const assignmentCreatedAt = new Date(assignments[0]?.createdAt);

            // Check if the assignment was created exactly 24 hours ago
            const isSubmitted = assignmentCreatedAt.getTime() > twentyFourHoursAgo.getTime();

            // Update the state with the result
            setLastSubmit(isSubmitted);
        }
    }, [assignments]);
    useEffect(() => {
        if (assignments) {
            if (courses?.assignments === assignments?.length) {
                const newCourses = user?.courses?.filter((item) => item?._id !== courses?._id);
                api.put(`/users/update/${user?._id}`, {
                    courses: [
                        ...newCourses,
                        {
                            id: courses?._id,
                            status: "completed"
                        }
                    ]
                })
            }
        }
    }, [assignments, courses, user])

    if (isLoading || assignmentsLoading) {
        return <Loader />
    }
    return (
        <div>
            <CourseCard course={courses} user="XXXX" refetch={refetch} />
            <h1 className='text-2xl pt-10'>Submit your assignment ({assignments?.length + 1})</h1>
            {
                courses.assignments === assignments?.length ? <p className='text-green-500 mt-3 text-sm'>All your assignments are submitted</p>
                    :
                    <>
                        {
                            !lastSubmit ? <form className="flex mt-5" onSubmit={submitAssignment}>
                                <div className="max-w-96 w-full">
                                    <Input
                                        label="Image Link"
                                        name='link'
                                        type="text"
                                        size="lg"
                                        variant="outlined"
                                        className='w-full'
                                    />
                                </div>
                                <button type='submit' className='bg-blue-500 text-white px-5 py-2 rounded-md ml-3'>
                                    Submit
                                </button>
                            </form>
                                :
                                <p className='text-red-500 mt-3 text-sm'>Your last assignment was submitted you can submit new assignment after 24 hours</p>
                        }
                    </>
            }

            <AssignmentHistory data={assignments} refetch={refetchAssignments} />
        </div>
    );
};

export default CourseSingleDetails;