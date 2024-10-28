import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
    Textarea,
} from "@material-tailwind/react";
import { api } from "../../../../Components/axios/axios.instance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import StatusChanger from "./StatusChanger";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../Components/Shared/Loader";
export const USER_ROLES = [
    {
        value: "admin",
        label: "Admin"
    },
    {
        value: "user",
        label: "User"
    },
    {
        value: "trainer",
        label: "Trainer"
    },
    {
        value: "manager",
        label: "Manager"
    },
    {
        value: "cm",
        label: "Senior Manager"
    },
    {
        label: "Senior Team Leader",
        value: "sgl",
    },
    {
        label: "Team Leader",
        value: "gl",
    },
    {
        label: "Teacher",
        value: "teacher",
    },
    {
        label: "Checker",
        value: "checker",
    },
    {
        label: "Counselor",
        value: "consultant",
    },
    {
        label: "Senior Counselor",
        value: "sc",
    }
]
export const getRolename = (value) => {
    return USER_ROLES.find(role => role.value === value)?.label
}
export function UserProfileDialog({ user, open, setOpen, refetch, type }) {
    const [password, setPassword] = useState("");
    const updatePassword = async () => {
        try {
            if (!password) {
                return toast.error("Password is required");
            }
            const res = await api.put(`/users/update-password/${user?._id}`, { password });
            if (res) {
                toast.success("Password updated successfully");
                refetch();
                setOpen(false);
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message || "Something went wrong");
        }
    }
    const handleOpen = () => setOpen(!open);
    const [inValues, setInValues] = useState({
        role: user?.role,
        settings: {
            gl: user?.settings?.gl,
            trainer: user?.settings?.trainer,
            consultant: user?.settings?.apprentice,
        },
        status: "",
    });
    const { user: currentUser } = useSelector((state) => state.user)
    const formHandler = async (e) => {
        e.preventDefault();
        const values = Object.fromEntries(new FormData(e.target));
        console.log(values);
        const settings = {
            ...inValues.settings,
            admin: user?.settings?.admin?._id,
        }
        const updateData = { ...values, settings, role: inValues.role, name: values?.firstName + " " + values?.lastName, status: inValues.status };
        if (inValues?.course) {
            updateData.course = inValues?.course
        }
        try {
            const res = await api.put(`/users/update/${user?._id}`, updateData);
            if (res) {
                setOpen(false);
                toast.success("User profile updated successfully");
                refetch();
            }
        } catch (error) {
            toast.error(error.response.data.message || error.message || "Something went wrong");
        }

    }
    const [readOnly, setReadOnly] = useState(false);

    useEffect(() => {
        if (user) {
            setInValues({ ...inValues, role: user?.role, settings: user?.settings, status: user?.status, course: user?.course || "" });
            if (currentUser?.role !== "admin") {
                setReadOnly(true);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, currentUser])

    const { data: courses, isLoading } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const response = await api.get("/courses");
            return response.data;
        }
    })

    const [addAmmount, setAddAmmount] = useState(0);
    const addMoneyHandler = async () => {
        if (!addAmmount) {
            return toast.error("Add ammount is required");
        }
        const newTransection = {
            type: "cradit",
            user: user._id,
            amount: addAmmount,
            source: "Admin",
        }
        try {
             await api.put(`/users/balance`, {
                amount: Number(addAmmount),
                user: user._id
            });
            const res = await api.post("/passbook", newTransection);
            setOpen(false);
            toast.success("Money added successfully");
            refetch();
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    const loackAcount = async (type) => {
        try {
            const response = await api.put(`/users/update/${user?._id}`, {
                locked: type,
            });
            if (response) {
                setOpen(false);
                toast.success(`Account ${type ? "Locked" : "Unlocked"} successfully`);
                refetch();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            <Dialog open={open} handler={handleOpen} className="h-screen overflow-auto pb-10">
                <DialogHeader>User Profile ({user?.userId})</DialogHeader>
                <DialogBody>
                    <form onSubmit={formHandler} className="border-t border-gray-200 pt-5">
                        <InputFeild
                            readOnly={readOnly}
                            name={"firstName"}
                            value={user?.firstName}
                            label={"First Name"}
                        />
                        <InputFeild
                            readOnly={readOnly}
                            name={"lastName"}
                            value={user?.lastName}
                            label={"Last Name"}
                        />
                        <InputFeild
                            readOnly={readOnly}
                            name={"email"}
                            value={user?.email}
                            label={"Email"}
                        />
                        <InputFeild
                            readOnly={readOnly}
                            name={"whatsapp"}
                            value={user?.whatsapp}
                            label={"Whatsapp"}
                        />
                        <InputFeild
                            readOnly={readOnly}
                            name={"phone"}
                            value={user?.phone}
                            label={"Phone Number"}
                        />
                        <InputFeild
                            readOnly={true}
                            value={user?.balance}
                            label={"Balance :  Not updateable"}
                        />
                        <InputFeild
                            readOnly={true}
                            value={user?.due}
                            label={"Account Due: Not updateable"}
                        />
                        <InputFeild
                            type={"number"}
                            readOnly={readOnly}
                            name={"reference"}
                            value={user?.reference}
                            label={"Referance"}
                        />

                        <div className="mb-5">
                            <Select
                                disabled={readOnly}
                                onChange={(e) => setInValues({ ...inValues, role: e })}
                                label={`Role`}
                                variant="outlined"
                                value={inValues.role}
                            >
                                {
                                    USER_ROLES.map(({ label, value }) => (
                                        <Option key={value} value={value}>
                                            {label}
                                        </Option>
                                    ))
                                }
                            </Select>
                        </div>
                        {

                            user?.role !== "gl" ? <InputFeild
                                onChange={(e) => setInValues({
                                    ...inValues,
                                    settings: { ...inValues.settings, gl: e.target.value }
                                })}
                                value={inValues.settings.gl}
                                label={"Team Leader"}
                                readOnly={readOnly}
                            />
                                :
                                <InputFeild
                                    onChange={(e) => setInValues({
                                        ...inValues,
                                        settings: { ...inValues.settings, sgl: e.target.value }
                                    })}
                                    value={inValues.settings.sgl}
                                    label={"Senior Team Leader"}
                                    readOnly={readOnly}
                                />
                        }
                        <InputFeild
                            onChange={(e) => setInValues({
                                ...inValues,
                                settings: { ...inValues.settings, trainer: e.target.value }
                            })}
                            value={inValues.settings.trainer}
                            label={"Trainer"}
                            readOnly={readOnly}
                        />
                        <InputFeild
                            onChange={(e) => setInValues({
                                ...inValues,
                                settings: { ...inValues.settings, consultant: e.target.value }
                            })}
                            value={inValues.settings.consultant}
                            label={"Consultant"}
                            readOnly={readOnly}
                        />

                        {
                            currentUser?.role === "admin" &&
                            <>
                                <div className="flex mb-5 items-center justify-between gap-5">
                                    <Input
                                        readOnly={readOnly}
                                        onChange={(e) => {
                                            setPassword(e.target.value)
                                        }}
                                        variant="outlined"
                                        placeholder={"Update Password"}
                                        label="Password"
                                    />
                                    <div
                                        onClick={updatePassword}
                                        className="btn btn-sm btn-primary"  >
                                        Update Password
                                    </div>
                                </div>
                                <div className="flex mb-5 items-center justify-between gap-5">
                                    <Input
                                        readOnly={readOnly}
                                        onChange={(e) => {
                                            setAddAmmount(e.target.value)
                                        }}
                                        variant="outlined"
                                        placeholder={"Add Money"}
                                        label="Add Money"
                                        type="number"
                                    />
                                    <div
                                        onClick={addMoneyHandler}
                                        className="btn btn-sm btn-primary"  >
                                        Add Money
                                    </div>
                                </div>
                            </>
                        }
                        {
                            user?.role === "teacher" &&
                            <div className="mb-5">
                                <Select
                                    disabled={readOnly}
                                    onChange={(e) => setInValues({ ...inValues, course: e })}
                                    label={`Course`}
                                    variant="outlined"
                                    value={user?.course}
                                >
                                    {
                                        courses.map((course) => (
                                            <Option key={course?._id} value={course?._id}>
                                                {course?.title}
                                            </Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        }

                        {
                            currentUser?.role === "admin" &&

                            <><div className="mb-5">
                                <label htmlFor="" className="text-sm">
                                    Status
                                </label>
                                <StatusChanger
                                    user={user}
                                    refetch={refetch}
                                    setOpen={setOpen}
                                />

                            </div>
                                <div className="mb-5">
                                    <label htmlFor="" className="text-sm">
                                        Lock Account
                                    </label>
                                    {
                                        user?.locked ?
                                            <div>
                                                <div onClick={() => loackAcount(false)} className="btn btn-success bg-green-500 border-none text-white btn-sm">
                                                    Unlock Account
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <div
                                                    onClick={() => loackAcount(true)}
                                                    className="btn btn-error text-white btn-sm">
                                                    Lock this account
                                                </div>
                                            </div>
                                    }
                                </div>
                            </>
                        }

                        {
                            currentUser?.role === "admin" && <Button variant="gradient" color="green" type="submit"
                                fullWidth
                            >
                                <span>Update</span>
                            </Button>
                        }
                    </form>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export const InputFeild = ({
    onChange, value, name, placeholder, label, type, readOnly, required }) => {

    return <div className="mb-5 w-full">
        <Input
            required={required}
            readOnly={readOnly}
            type={type ? type : 'text'}
            name={name}
            defaultValue={value}
            onChange={onChange}
            variant="outlined"
            label={label}
            placeholder={placeholder}
        />
    </div>
}
export const InputTextArea = ({
    onChange, value, name, placeholder, label, type, readOnly }) => {

    return <div className="mb-5 w-full">
        <Textarea
            readOnly={readOnly}
            type={type ? type : 'text'}
            name={name}
            defaultValue={value}
            onChange={onChange}
            variant="outlined"
            label={label}
            placeholder={placeholder}
        />
    </div>
}