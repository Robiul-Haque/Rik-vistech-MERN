
import { Button, CardBody, CardFooter, Chip, IconButton, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';

import { api } from '../../Components/axios/axios.instance';
import Loader from '../../Components/Shared/Loader';
import { sendWhatsappMessage } from '../../helper/linkgenerateor';


const TableTimeZone = ({ filters, setUsers }) => {
    const [TABLE_HEAD, setTABLE_HEAD] = useState(["Date", "User id", "Name", "Phone", "Whatsapp", "Referer", "Message", "Time"]);
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const pageNumber = new URLSearchParams(location.search).get('page')
    const navigate = useNavigate();

    const { isLoading, data: users, refetch } = useQuery({
        queryKey: ["users", filters, pageNumber],
        queryFn: async () => {
            const passbook = await api.post(`/users/?page=${pageNumber}&&limit=10`, filters);

            return passbook.data
        }
    })
    const [permission, setPermission] = useState(false);

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

    const sendMessage = (user) => {
        const whatsapp = (user?.phone?.startsWith("+") || user?.phone?.startsWith("88")) ? user?.phone : `+88${user?.phone}`
        sendWhatsappMessage(whatsapp, { name: user?.firstName + " " + user?.lastName, userId: user?.userId })
    }

    if (isLoading) {
        return <Loader />
    }
    return (
        <React.Fragment>
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
                                {
                                    (Number(pageNumber) > 5 && pagesList().length !== Number(pageNumber)) &&
                                    <IconButton
                                        variant="filled"
                                        size="sm"
                                        className='bg-primary'
                                    >
                                        {pageNumber}
                                    </IconButton>
                                }
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
                <h1 className='py-3 text-sm'>Total Result : {users?.results}</h1>
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
                        {users?.data?.sort(function (a, b) {
                            // Check if 'sendMessage' property exists in 'settings'
                            var aHasSendMessage = a.settings && a.settings.sendMessage !== undefined;
                            var bHasSendMessage = b.settings && b.settings.sendMessage !== undefined;

                            // Sorting logic
                            if (aHasSendMessage && !bHasSendMessage) {
                                return 1; // 'a' comes after 'b'
                            } else if (!aHasSendMessage && bHasSendMessage) {
                                return -1; // 'a' comes before 'b'
                            } else {
                                return 0; // Maintain the existing order
                            }
                        })?.map(
                            (
                                user,
                                index,
                            ) => {
                                const classes = "p-4";

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
                                                {moment(user.createdAt).format("DD/MM/YYYY hh:mm A")}
                                            </Typography>
                                        </td>
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
                                            <div className="flex items-center gap-3"
                                                style={{
                                                    visibility: !permission ? "visible" : "hidden"
                                                }}
                                            >
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
                                            style={{
                                                display: user?.role === "admin" ? "none" : "block",
                                                visibility: !permission ? "visible" : "hidden"
                                            }}
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
                                            style={{
                                                visibility: !permission ? "visible" : "hidden"
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    {

                                                        <button
                                                            onClick={() => {
                                                                sendMessage(user)
                                                            }}
                                                            className='btn-primary btn btn-xs px-4 '>
                                                            Message
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                        <td>

                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {user?.time}
                                                    </Typography>
                                                </div>
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

export default TableTimeZone;