import React, { useEffect, useState } from 'react';
import { Input, Textarea } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { api, apiUpload } from '../../../../../Components/axios/axios.instance';
import toast from 'react-hot-toast';

const CourseForm = ({ setOpen, refetch, mode, course: editCourse }) => {
    const [course, setCourse] = useState({
        title: "",
        category: "",
        price: 99,
        description: "",
        learn: [],
        assignments: 10,
        duration: 10,
        meetingsId: "",
        footerDes: "",
    })
    const [file, setFile] = useState(null);
    const addNewItem = (e) => {
        e.preventDefault();
        const text = e.target.option.value;
        if (text) {
            setCourse({ ...course, learn: [...course.learn, text] });
            e.target.option.value = "";
        }
    }
    const removeItem = (index) => {
        const newLearn = course.learn.filter((item, i) => i !== index);
        setCourse({ ...course, learn: newLearn });
    }
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const handleSubmit = async (e) => {
        try {
            if (!file) {
                return toast.error("Please upload course banner");
            }
            const formData = new FormData();
            formData.append("image", file);
            const response = await apiUpload.post("/upload", formData)
            const res = await api.post("/courses", {
                ...course,
                image: response.data.path,
            });
            toast.success(res.data.message);
            setSuccess(res.data.message);
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
            if (!file) {
                const res = await api.put(`/courses/${editCourse._id}`, { ...course });
                toast.success(res.data.message);
                setSuccess(res.data.message);
                setError("");
                setOpen(false);
                refetch();
                return
            }
            const formData = new FormData();
            formData.append("image", file);
            const response = await apiUpload.post("/upload", formData)
            const res = await api.put(`/courses/${editCourse._id}`, {
                ...course,
                image: response.data.path,
            });
            toast.success(res.data.message);
            setSuccess(res.data.message);
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
            <h1 className='text-lg'>{mode === "edit" ? "Edit" : "Add New"} Course</h1>
            <div className='mt-5'>
                <InputFeild
                    label="Title"
                    value={course.title}
                    onChange={(e) => setCourse({ ...course, title: e.target.value })}
                />
                <InputFeild
                    label="Category"
                    value={course.category}
                    onChange={(e) => setCourse({ ...course, category: e.target.value })}
                />
                <InputFeild
                    type={"number"}
                    label="Price"
                    value={course.price}
                    onChange={(e) => setCourse({ ...course, price: e.target.value })}
                />
                <InputFeild
                    type={"number"}
                    label="Duration"
                    value={course.duration}
                    onChange={(e) => setCourse({ ...course, duration: e.target.value })}
                />
                <InputFeild
                    type={"number"}
                    label="Assignments"
                    value={course.assignments}
                    onChange={(e) => setCourse({ ...course, assignments: e.target.value })}
                />

                <InputFeild
                    type={"file"}
                    label="Course Banner"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputFeild
                    label="Meetings Id"
                    value={course.meetingsId}
                    onChange={(e) => setCourse({ ...course, meetingsId: e.target.value })}
                />
                <InputTextArea
                    label="Description"
                    value={course.description}
                    onChange={(e) => setCourse({ ...course, description: e.target.value })}
                />
                <h1 className='text-sm'>
                    What you will learn
                </h1>
                <div className="px-5">
                    <ol className='list-decimal px-5 text-xs mt-1'>
                        {
                            course.learn.map((item, index) => (
                                <li key={index} className='mb-1'>
                                    <span className='text-gray-500'>{item}</span>
                                    <button onClick={() => removeItem(index)} className='btn btn-xs btn-error ml-2 '>
                                        <FontAwesomeIcon icon={faXmark} className='text-white' />
                                    </button>
                                </li>
                            ))
                        }
                    </ol>
                </div>
                <form onSubmit={addNewItem} className='px-5 mt-3 flex items-center gap-5 mb-5'>
                    <div className='w-full'>
                        <Input
                            name='option'
                            size="md"
                            label="Option"
                        />
                    </div>
                    <button type='submit' className='btn btn-sm btn-primary'>Add</button>
                </form>
                <InputTextArea
                    label="Extended Description"
                    value={course.footerDes}
                    onChange={(e) => setCourse({ ...course, footerDes: e.target.value })}
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

export default CourseForm;

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