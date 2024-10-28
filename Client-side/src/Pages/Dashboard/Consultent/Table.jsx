
import { Button, CardBody, CardFooter, Chip, IconButton, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../../Components/axios/axios.instance';
import Loader from '../../../Components/Shared/Loader';
import { sendWhatsappMessage } from '../../../helper/linkgenerateor';
import toast from 'react-hot-toast';
import SetTime from './SetTime';


const UsersTable = ({ filters: filtersReq, setUsers, consultant }) => {
    const [TABLE_HEAD, setTABLE_HEAD] = useState(["Date", "User id", "Name", "Phone", "Whatsapp", "Telegram", "Referer", "Message", "Message Done"]);
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const pageNumber = new URLSearchParams(location.search).get('page')
    const status = new URLSearchParams(location.search).get('status')
    const navigate = useNavigate();
    const [filters, setFilters] = useState({ ...filtersReq });
    const { isLoading, data: users, refetch } = useQuery({
        queryKey: ["users", filters, pageNumber],
        queryFn: async () => {
            const passbook = await api.post(`/users/consultant/${user?.userId}?page=${pageNumber}`, filters);
            setUsers(passbook.data)
            return passbook.data
        }
    })
    const [permission, setPermission] = useState(user?.permission);
    useEffect(() => {
        setFilters(filtersReq);
        setPermission(user?.permission);
        if (user?.role === "consultant") {
            setFilters((prev) => ({
                ...prev,
                "settings.sendMessage": { "$exists": false }
            }));
        }

    }, [user, filtersReq]);

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


    const [complete, setComplete] = useState(false)
    const sendMessage = async (user) => {
        const whatsapp = (user?.whatsapp?.startsWith("+") || user?.whatsapp?.startsWith("88")) ? user?.whatsapp : `+88${user?.whatsapp}`
        const res = await sendWhatsappMessage(whatsapp, { name: user?.firstName + " " + user?.lastName, userId: user?.userId })
    }
    const messageUpdate = async (user, type) => {
        try {
            const res = await api.put(`/users/update/${user?._id}`,
                { "settings.sendMessage": new Date(), "settings.messageError": type === "yes" ? false : true }
            )
            if (res) {
                refetch()
                toast.success("User updated successfully");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    useEffect(() => {
        if (complete) {
            setTABLE_HEAD(["Date", "User id", "Name", "Phone", "Whatsapp", "Telegram", "Referer", "Message", "Message Done", "Set Time"]);
        }
        else {
            setTABLE_HEAD(["Date", "User id", "Name", "Phone", "Whatsapp",
                "Telegram", "Referer", "Message", "Message Done"]);
        }

    }, [complete, status])

    if (isLoading) {
        return <Loader />
    }
    return (
        <React.Fragment>
            <CardBody className="overflow-scroll px-0">
                <div className="flex pb-5 gap-3 flex-wrap">
                    <Button variant='filled' onClick={() => {
                        setComplete(true)
                        setFilters({ ...filters, "settings.sendMessage": { "$exists": true } })

                    }}
                        color='green'
                    >
                        Completed
                    </Button>
                    <Button variant='filled' onClick={() => {
                        setComplete(false)
                        setFilters({ ...filters, "settings.sendMessage": { "$exists": false } })
                    }}
                        color="amber"
                    >
                        Not Completed
                    </Button>
                </div>
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
                                                <button
                                                    onClick={() => {

                                                        navigator.clipboard.writeText(`
                                                        Name: ${user?.firstName + " " + user?.lastName} , UserID: ${user?.userId}, Phone: ${user?.phone} , Whatsapp: ${user?.whatsapp} , Date : ${moment(user?.createdAt).format("DD/MM/YYYY hh:mm A")},
                                                        Telegram ID: ${user?.telegram} , Refer ID: ${user?.referer ? user?.referer?.userId : "N/A"}
                                                        `)

                                                    }}
                                                    className='btn btn-xs btn-primary ml-1'>
                                                    Copy
                                                </button>
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
                                                        {/* {user?.phone} */}
                                                        <a href={`tel:${user?.phone}`} className='btn btn-xs btn-primary'>Call</a>
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
                                                        <button onClick={() => {
                                                            sendMessage(user)
                                                        }} className='btn btn-xs btn-primary'>Whatsapp</button>
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
                                                        {user?.telegram}
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
                                                        user?.settings?.sendMessage ?
                                                            <button
                                                                className='btn-primary bg-green-600 border-none btn-success btn btn-xs px-4 text-[9px]'>
                                                                Done
                                                            </button>
                                                            :
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

                                        <td className={classes}
                                            style={{
                                                visibility: !permission ? "visible" : "hidden"
                                            }}
                                        >
                                            <div className="flex items-center gap-3">
                                                {
                                                    !user?.settings?.messageError && <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => {
                                                                messageUpdate(user, "yes")
                                                            }}
                                                            className='btn-success btn btn-xs bg-green-600 px-4 text-white border-none'>
                                                            Yes
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                messageUpdate(user, "no")
                                                            }}
                                                            className='btn-error btn btn-xs bg-red-500 px-4 text-white border-none'>
                                                            No
                                                        </button>
                                                    </div>
                                                }
                                                {

                                                    user?.settings?.messageError !== undefined && user?.settings?.messageError === "false" &&
                                                    <button
                                                        className='btn-error btn btn-xs bg-red-500 px-4 text-white border-none text-[8px]'>
                                                        Whatsapp Wrong
                                                    </button>
                                                }{
                                                    user?.settings?.messageError !== undefined && user?.settings?.messageError === "true" &&
                                                    <button
                                                        className='btn-success btn btn-xs bg-green-600 px-4 text-white border-none'>
                                                        Done
                                                    </button>
                                                }
                                            </div>
                                        </td>
                                        {
                                            complete &&
                                            <td>
                                                <SetTime user={user} />
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

export default UsersTable;