
import { Button, CardBody, CardFooter, IconButton, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../../../Components/axios/axios.instance';
import Loader from '../../../../Components/Shared/Loader';
import toast from 'react-hot-toast';
import { whatsappText } from '../../../../helper/linkgenerateor';
import { refreshUser } from '../../../../redux/features/user/userSlice';
import moment from 'moment';
let TABLE_HEAD = ["Date", "Name", "User id", "Phone", "Whatsapp"];

const Table = ({ filters }) => {
    const { user: currentUser, settings } = useSelector((state) => state.user);
    const location = useLocation();
    const pageNumber = new URLSearchParams(location.search).get('page')
    const navigate = useNavigate();
    const { isLoading, data: users, refetch } = useQuery({
        queryKey: ["users", filters, pageNumber],
        queryFn: async () => {
            const passbook = await api.post(`/users/?page=${pageNumber}`, filters);
            return passbook.data
        }
    })
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
    const dispathc = useDispatch()
    const selectManager = async (id) => {
        try {
            const res = await api.put('/users/setting/83483', { auto_gl: id })
            dispathc(refreshUser(res.data))
            toast.success("Manager Selected")
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    useEffect(() => {
        if (currentUser?.role === "trainer") {
            TABLE_HEAD = ["Date", "Active Date", "Name", "User id", "Phone", "Whatsapp"];
        }
    }, [currentUser?.role])
    if (isLoading) {
        return <Loader />
    }
    return (
        <React.Fragment>
            <CardBody className="overflow-scroll px-0">
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
                                    <tr key={index}

                                    >
                                        <td className={classes}
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal cursor-pointer"
                                            >
                                                {
                                                    moment(user?.createdAt).format("DD-MM-YYYY")
                                                }
                                            </Typography>
                                        </td>
                                        {
                                            (currentUser?.role === "trainer") && <td className={classes}
                                            >
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal cursor-pointer"
                                                >
                                                    {
                                                        user?.settings?.activates ?
                                                        moment(user?.settings?.activates).format("DD-MM-YYYY") : 
                                                        (!user?.settings?.activates && user?.status === "active") ?
                                                        "Date Not Set" : "Not Active"
                                                    }
                                                </Typography>
                                            </td>
                                        }
                                        <td className={classes}
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal cursor-pointer"
                                            >
                                                {user?.firstName + " " + user?.lastName}
                                            </Typography>
                                        </td>

                                        <td className={classes}
                                        >
                                            <div className="flex items-center gap-3 cursor-pointer">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {user?.userId}
                                                    </Typography>
                                                </div>
                                            </div>
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
                                            onClick={() => whatsappText(user?.whatsapp)}
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal btn-link cursor-pointer"
                                            >
                                                {user.whatsapp}
                                            </Typography>
                                        </td>
                                        {
                                            currentUser?.role === "manager" &&
                                            <td className={classes}
                                            >
                                                {
                                                    settings?.auto_gl === user?.userId ?
                                                        <button className='btn btn-sm btn-success'>Selected</button>
                                                        :
                                                        <button onClick={() => selectManager(user?.userId)} className='btn btn-sm btn-primary'>Select</button>
                                                }
                                            </td>
                                        }
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

export default Table;