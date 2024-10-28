import React, { useEffect, useState } from 'react';
import { Input, Textarea } from '@material-tailwind/react';
import { api } from '../../../../../Components/axios/axios.instance';
import toast from 'react-hot-toast';

const GroupForm = ({ setOpen, refetch, mode, course: editCourse }) => {
    const [course, setCourse] = useState({
        name: "",
        link: ""
    })
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const handleSubmit = async (e) => {
        try {

            const res = await api.post("/group", course);
            toast.success(res?.data?.message);
            setSuccess(res?.data?.message);
            setError("");
            setOpen(false);
            refetch();
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
            setError(error.response.data.message || "Something went wrong");
            setSuccess("");
        }

    }
    const updateHandler = async (e) => {
        try {

            const res = await api.put(`/group/${editCourse._id}`, {
                name: course.name,
                link: course.link
            });
            toast.success(res?.data?.message);
            setSuccess(res?.data?.message);
            setError("");
            setOpen(false);
            refetch();
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
            setError(error.response.data.message || "Something went wrong");
            setSuccess("");
        }

    }
    useEffect(() => {
        if (mode === "edit") {
            setCourse(editCourse);
        }
    }, [editCourse, mode])
    return (
        <div className='text-black p-4'>
            <h1 className='text-lg'>{mode === "edit" ? "Edit Group" : "Add New Group"}</h1>
            <div className='mt-5'>
                <InputFeild
                    label="Group Name"
                    value={course.name}
                    onChange={(e) => setCourse({ ...course, name: e.target.value })}
                />
                <InputFeild
                    label="Group Link"
                    value={course.link}
                    onChange={(e) => setCourse({ ...course, link: e.target.value })}
                />
                {
                    error && <p className='text-red-500 text-xs'>{error}</p>
                }
                {
                    success && <p className='text-green-500 text-xs'>{success}</p>
                }
                {
                    mode === "edit" ?
                        <button onClick={updateHandler} className='btn btn-primary mt-5'>Update Course</button>
                        :
                        <button onClick={handleSubmit} className='btn btn-primary mt-5'>Add Course</button>
                }
            </div>
        </div>
    );
};

export default GroupForm;

const InputFeild = ({
    onChange, value, name, placeholder, label, type, readOnly }) => {

    return <div className="mb-5 w-full">
        <Input
            readOnly={readOnly}
            type={type ? type : 'text'}
            name={name}
            value={value}
            onChange={onChange}
            variant="outlined"
            label={label}
            placeholder={placeholder}
        />
    </div>
}

const InputTextArea = ({
    onChange, value, name, placeholder, label, type, readOnly }) => {

    return <div className="mb-5 w-full">
        <Textarea
            readOnly={readOnly}
            type={type ? type : 'text'}
            name={name}
            value={value}
            onChange={onChange}
            variant="outlined"
            label={label}
            placeholder={placeholder}
        />
    </div>
}