
import { Button, CardBody, CardFooter, Checkbox, Chip, IconButton, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../Components/axios/axios.instance';
import Loader from '../../../../Components/Shared/Loader';
import moment from 'moment';
import toast from 'react-hot-toast';


const UserTableSCU = ({ filters, selected, setOpen, refetch, page }) => {
    const [TABLE_HEAD, setTABLE_HEAD] = useState(["Date", "User id", "Name", "Phone", "Whatsapp", "Reference", "Consultant", "Status"]);
    useEffect(() => {
        if (page === "gl") {
            setTABLE_HEAD(["Date", "User id", "Name", "Phone", "Whatsapp", "Reference", "GL"]);
        }
        else if (page === "trainer") {
            setTABLE_HEAD(["Date", "User id", "Name", "Phone", "Whatsapp", "Reference", "Trainer", "Status"]);
        }
        else {
            setTABLE_HEAD(["Date", "User id", "Name", "Phone", "Whatsapp", "Reference", "Consultant", "Status"]);
        }
    }, [page])
    const { user } = useSelector((state) => state.user);
    const [cradits, setCradits] = useState([]);
    const [pageNumber, setPageNumber] = useState(1)
    const { isLoading, data: users, refetch: refetchUsers } = useQuery({
        queryKey: ["users", filters, pageNumber],
        queryFn: async () => {
            const passbook = await api.post(`/users/?page=${pageNumber}`, filters);
            return passbook.data
        }
    })
    const [selectedUser, setSelectedUser] = useState([]);

    const pagesList = () => {
        const pages = [];
        for (let i = 0; i < users?.totalPages; i++) {
            pages.push(i + 1);
        }
        return pages;
    }
    const paginate = (page) => {
        setPageNumber(page)
    }
    const prev = () => {
        setPageNumber(Number(pageNumber) - 1)
    }
    const next = () => {
        setPageNumber(Number(pageNumber) + 1)
    }
    const selectUser = (user) => {
        if (selectedUser.includes(user)) {
            setSelectedUser(selectedUser.filter((u) => u !== user))
        } else {
            setSelectedUser([...selectedUser, user])
        }
    }
    const selectAll = () => {
        const allUsers = users?.data?.map((user) => user._id)
        if (selectedUser.length === allUsers.length) {
            setSelectedUser([])
        } else {
            setSelectedUser(allUsers)

        }
    }
    const assign = async () => {
        try {
            if (page === "gl") {
                const res = await api.put("/users/assign-gl", { users: selectedUser, consultant: selected?.userId });
                toast.success(res?.data?.message)
                setOpen(false)
                refetch()
                setSelectedUser([])
                refetchUsers()
            }
            else if (page === "trainer") {
                const res = await api.put("/users/assign-trainer", { users: selectedUser, consultant: selected?.userId });
                toast.success(res?.data?.message)
                setOpen(false)
                refetch()
                setSelectedUser([])
                refetchUsers()
            }
            else {
                const res = await api.put("/users/assign", { users: selectedUser, consultant: selected?.userId });
                toast.success(res?.data?.message)
                setOpen(false)
                refetch()
                setSelectedUser([])
                refetchUsers()
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='p-5'>
            <div className="flex items-center gap-5">
                <button className='btn btn-success'>
                    Selected ({selectedUser.length}) Items
                </button>

                <button className='btn btn-primary disabled:text-black' disabled={selectedUser.length === 0}
                    onClick={assign}
                >
                    Assign ({selectedUser.length}) Items to [{selected?.userId}]
                </button>
            </div>
            <CardBody className="px-0">
                <CardFooter className="lg:flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Button disabled={pageNumber === "1"} onClick={prev} variant="outlined" size="sm">
                        Previous
                    </Button>
                    <div className="flex items-center gap-2 lg:py-0 py-3">
                        {
                            pagesList().slice(0, 5).map((page) => (
                                <IconButton
                                    key={page}
                                    variant="filled"
                                    size="sm"
                                    className={page === Number(pageNumber) ? "bg-primary" : ""}
                                    onClick={() => {
                                        paginate(page)
                                    }}
                                >
                                    {page}
                                </IconButton>
                            ))
                        }
                        {
                            pagesList().length > 5 &&
                            <>
                                <IconButton
                                    variant="filled"
                                    size="sm"
                                >
                                    ...
                                </IconButton>
                                <IconButton
                                    className={pagesList().length === Number(pageNumber) ? "bg-primary" : ""}
                                    variant="filled"
                                    size="sm"
                                    onClick={() => {
                                        paginate(pagesList().length)
                                    }}
                                >
                                    {pagesList().slice(-1)[0]}
                                </IconButton>
                            </>
                        }
                    </div>
                    <Button disabled={pageNumber === pagesList().length.toString()} onClick={next} variant="outlined" size="sm">
                        Next
                    </Button>
                </CardFooter>
                <h1 className='py-3'>Total Result : {users?.count}</h1>
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                                <Checkbox
                                    onClick={selectAll}
                                    checked={selectedUser.length === users?.data?.length ? true : false}
                                />
                            </th>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}

                        </tr>
                    </thead>
                    <tbody>
                        {users?.data?.map(
                            (
                                user,
                                index,
                            ) => {
                                const isLast = index === cradits.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}

                                    >
                                        <td className={classes}>
                                            <Checkbox defaultChecked
                                                onClick={() => selectUser(user._id)}
                                                checked={selectedUser.includes(user._id)}
                                            />
                                        </td>
                                        <td className={classes}
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {moment(user.createdAt).format("DD/MM/YYYY")}
                                            </Typography>
                                        </td>
                                        <td className={classes}
                                        >
                                            <div className="flex items-center gap-3">

                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {user?.userId}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={classes}
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {(user?.firstName + " " + user?.lastName).slice(0, 20)}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {user?.phone}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {user?.whatsapp}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>

                                        <td className={classes}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {user?.reference}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        {
                                            (page !== "gl" && page !== "trainer") &&
                                            <td className={classes}
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {user.settings?.consultant}
                                                </Typography>
                                            </td>
                                        } {
                                            page === "trainer" &&
                                            <td className={classes}
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {user.settings?.trainer}
                                                </Typography>
                                            </td>
                                        }
                                        {
                                            page === "gl" &&
                                            <td className={classes}
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {user.settings?.gl}
                                                </Typography>
                                            </td>
                                        }

                                        {
                                            page !== "gl" && <td className={classes}
                                            >
                                                <div className="w-max">
                                                    <Chip
                                                        size="sm"
                                                        variant="ghost"
                                                        value={user?.status ? user?.status : "inactive"}
                                                        color={
                                                            user?.status === "" || user?.status === "inactive"
                                                                ? "amber"
                                                                : "green"
                                                        }
                                                    />
                                                </div>
                                            </td>
                                        }


                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
        </div >

    );
};

export default UserTableSCU;