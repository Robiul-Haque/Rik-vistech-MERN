
import { Button, CardBody, CardFooter, IconButton, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../../../Components/axios/axios.instance';
import Loader from '../../../../Components/Shared/Loader';
import toast from 'react-hot-toast';
import { whatsappLink, whatsappText } from '../../../../helper/linkgenerateor';
import { UserProfileDialog } from '../../Admin/Components/UserProfileDialog';

const Table = ({ filters, pageName }) => {
    const { user } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const [TABLE_HEAD, setTABLE_HEAD] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [cradits, setCradits] = useState([]);
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
    useEffect(() => {
        if (pageName === "sc") {
            setTABLE_HEAD(["Name", "User id", "Phone", "Whatsapp", "Permission"])
        }
        else if (pageName === "gl" || pageName === "trainer") {
            setTABLE_HEAD(["Name", "User id", "Phone", "Whatsapp"])
        }
    }, [pageName])
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
    const permissionChanger = async (user, permission) => {
        try {
            const res = await api.put(`/users/update/${user}`, { permission: permission })
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
                                const isLast = index === cradits.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}

                                    >
                                        <td className={classes}
                                            onClick={() => navigate(`${user?._id}`)}
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
                                            onClick={() => {
                                                setSelectedUser(user)
                                                setOpen(true)
                                            }}
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
                                            (pageName !== "gl" && pageName !== "trainer") &&
                                            <td className={classes}>
                                                {
                                                    user?.permission === true ?
                                                        <Button variant="outlined" color="red" size="sm" onClick={() => permissionChanger(user._id, false)}>
                                                            Yes
                                                        </Button>
                                                        :
                                                        <Button variant="outlined" color="red" size="sm" onClick={() => permissionChanger(user._id, true)}>
                                                            No
                                                        </Button>
                                                }
                                            </td>
                                        }


                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
                {
                    user?.role === "admin" && <UserProfileDialog
                        open={open}
                        setOpen={setOpen}
                        user={selectedUser}
                        refetch={refetch}
                    />
                }
            </CardBody>
        </React.Fragment>

    );
};

export default Table;