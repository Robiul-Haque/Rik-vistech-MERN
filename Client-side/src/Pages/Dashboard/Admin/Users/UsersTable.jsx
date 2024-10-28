
import { Button, CardBody, CardFooter, Chip, IconButton, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { api } from '../../../../Components/axios/axios.instance';
import { UserProfileDialog } from '../Components/UserProfileDialog';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../../Components/Shared/Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const UsersTable = ({ filters, setUsers, setStatistic }) => {
    const [TABLE_HEAD, setTABLE_HEAD] = useState(["Date", "Active Date", "User id", "Name", "Phone", "Whatsapp", "Reference", "Consultant", "T L", "Status"]);
    const { user } = useSelector((state) => state.user);
    const [selectedUser, setSelectedUser] = useState(null);
    const [open, setOpen] = useState(false)
    const location = useLocation();
    const pageNumber = new URLSearchParams(location.search).get('page') || 1
    const status = new URLSearchParams(location.search).get('status')
    const navigate = useNavigate();

    const { isLoading, data: users, refetch } = useQuery({
        queryKey: ["users", filters, pageNumber],
        queryFn: async () => {
            const passbook = await api.post(`/users?page=${pageNumber}`, filters);
            setUsers && setUsers(passbook.data)
            setStatistic && setStatistic({
                total: passbook.data.count,
                active: passbook.data.active,
                inactive: passbook.data.inactive,
            })
            return passbook.data
        }
    })

    const [isAdmin, setIsAdmin] = useState(false);
    const openDeveloper = () => {
        setIsAdmin(user?.email === "tamizrabbi@gmail.com" ? true : false);
    }
    const deleteUser = async (id) => {
        try {
            const res = await api.delete(`/users/${id}`);
            if (res) {
                setOpen(false);
                toast.success("User deleted successfully");
                refetch();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    const pagesList = () => {
        const pages = [];
        for (let i = 0; i < users?.totalPages; i++) {
            pages.push(i + 1);
        }
        return pages;
    }
    const paginate = (page) => {
        const updatedQuery = new URLSearchParams({
            page: page,
        })
        if (status) {
            updatedQuery.append('status', status)
        }
        navigate(`${location.pathname}?${updatedQuery}`);
    }
    const prev = () => {
        const updatedQuery = new URLSearchParams({
            page: Number(pageNumber) - 1,
        })
        if (status) {
            updatedQuery.append('status', status)
        }
        navigate(`${location.pathname}?${updatedQuery}`);
    }
    const next = () => {
        const updatedQuery = new URLSearchParams({
            page: (Number(pageNumber) + 1) || 2,
        })
        if (status) {
            updatedQuery.append('status', status)
        }
        navigate(`${location.pathname}?${updatedQuery}`);
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <React.Fragment>
            <CardBody className="overflow-y-auto px-0">
                <CardFooter className="lg:flex items-center justify-between border-blue-gray-50 p-0">
                    <Button disabled={Number(pageNumber) <= 1} onClick={prev} variant="outlined" size="sm">
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
                                    className={pagesList().length >= Number(pageNumber) ? "bg-primary" : ""}
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
                <h1 className='py-3 text-sm'>Total Result : {users?.count}</h1>
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
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
                                const isLast = index === users?.data?.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}
                                    >

                                        <td className={classes}
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {
                                                    moment(user.createdAt).format("DD/MM/YYYY hh:mm A")
                                                }
                                            </Typography>
                                        </td>

                                        <td className={classes}
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {
                                                    user.settings?.activates ?
                                                    moment(user.settings?.activates).format("DD/MM/YYYY hh:mm A")
                                                    :
                                                    "Not Activated"
                                                }
                                            </Typography>
                                        </td>
                                        <td className={classes}
                                            onClick={() => {
                                                setSelectedUser(user)
                                                setOpen(true)
                                            }}
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
                                            onClick={() => {
                                                setSelectedUser(user)
                                                setOpen(true)
                                            }}
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
                                        {
                                            user?.role === "user" &&
                                            <td className={classes}
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
            {
                user?.role === "admin" && <UserProfileDialog
                    open={open}
                    setOpen={setOpen}
                    user={selectedUser}
                    refetch={refetch}
                />
            }

        </React.Fragment>

    );
};

export default UsersTable;