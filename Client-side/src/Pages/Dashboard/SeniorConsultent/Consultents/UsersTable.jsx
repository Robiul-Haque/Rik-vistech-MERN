
import { Button, CardBody, CardFooter, Chip, IconButton, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../../../Components/axios/axios.instance';
import Loader from '../../../../Components/Shared/Loader';
import Header from './Header';
import toast from 'react-hot-toast';



const UsersTable = ({ filters, consultant, page }) => {
    const [TABLE_HEAD, setTABLE_HEAD] = useState(["User id", "Name", "Phone", "Whatsapp", "Status", "Message Done"]);
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const pageNumber = new URLSearchParams(location.search).get('page')
    const navigate = useNavigate();
    const { isLoading, data: users, refetch } = useQuery({
        queryKey: ["users" + consultant?._id, filters, pageNumber],
        queryFn: async () => {
            if (page !== "gl" && page !== "trainer") {
                const passbook = await api.post(`/users/consultant/${consultant.userId}?page=${pageNumber}`);
                return passbook.data
            }
            else if (page === "trainer") {
                const passbook = await api.post(`/users/trainer-user/${consultant.userId}?page=${pageNumber}`);
                return passbook.data
            }
            else {
                const passbook = await api.post(`/users/gl-user/${consultant.userId}?page=${pageNumber}`);
                return passbook.data
            }
        }
    })
    useEffect(() => {
        if (page === "gl") {
            setTABLE_HEAD(["User id", "Name", "Phone", "Whatsapp", "Status", "Remove"]);
        }
        else if (page === "trainer") {
            setTABLE_HEAD(["User id", "Name", "Phone", "Whatsapp", "Status", "Remove"]);
        }
        else {
            setTABLE_HEAD(["User id", "Name", "Phone", "Whatsapp", "Status", "Message Done", "Remove"]);

        }
    }, [page])
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
        navigate(`${location.pathname}?${updatedQuery}`);
    }
    const prev = () => {
        const updatedQuery = new URLSearchParams({
            page: Number(pageNumber) - 1,
        })
        navigate(`${location.pathname}?${updatedQuery}`);
    }
    const next = () => {
        const updatedQuery = new URLSearchParams({
            page: (Number(pageNumber) + 1) || 2,
        })
        navigate(`${location.pathname}?${updatedQuery}`);
    }
    const remove = async (user) => {
        try {
            if (page === "gl") {
                const res = await api.put(`/users/update/${user}`, {
                    "settings.gl": ""
                })
            }
            else if (page === "trainer") {
                const res = await api.put(`/users/update/${user}`, {
                    "settings.trainer": ""
                })
            }
            else {
                const res = await api.put(`/users/update/${user}`, {
                    "settings.consultant": ""
                })
            }
            toast.success("User Removed Successfully")
            refetch()
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <React.Fragment>
            <Header user={consultant} data={users} refetch={refetch} page={page} />
            <CardBody className="overflow-scroll px-0">
                <CardFooter className="lg:flex items-center justify-between border-t border-blue-gray-50 p-4">
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
                <div className="flex gap-4 text-sm">
                    <h1 className='py-3'>Total Result : {users?.count}</h1>
                    <h1 className='py-3'>Active : {users?.active}</h1>
                    <h1 className='py-3'>Inactive : {users?.inactive}</h1>
                </div>
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
                                const isLast = index === users.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index} >

                                        <td className={classes}>
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
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {user?.firstName + " " + user?.lastName}
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
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {user.whatsapp}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
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
                                        {
                                            (page !== "gl" && page !== "trainer") &&
                                            <td className={classes}>
                                                <div className="w-max">
                                                    <Chip
                                                        size="sm"
                                                        variant="ghost"
                                                        value={user?.settings?.
                                                            sendMessage ? "Yes" : "No"}
                                                        color={
                                                            !user?.settings?.
                                                                sendMessage
                                                                ? "amber"
                                                                : "green"
                                                        }
                                                    />
                                                </div>
                                            </td>
                                        }
                                        <td className={classes}>
                                            <div className="w-max">
                                                <button
                                                    onClick={() => remove(user?._id)}
                                                    className='btn btn-error btn-xs text-white'>
                                                    Remove
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
        </React.Fragment>

    );
};

export default UsersTable;