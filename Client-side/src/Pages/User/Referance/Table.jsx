
import { Button, CardBody, CardFooter, Chip, IconButton, Option, Select, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../../../Components/axios/axios.instance';
import Loader from '../../../Components/Shared/Loader';
import { BlankDialog } from '../../../Components/Dialog/BlankDialog';
import { InputFeild } from '../../Dashboard/Admin/Components/UserProfileDialog';
import { PhoneNumberSelector } from '../../Signup/PhoneNumberSelector';
import { countrys } from '../../../data/countrys';


const UsersTable = ({ filters, setStatistics }) => {
    const [TABLE_HEAD, setTABLE_HEAD] = useState(["Date", "User id", "Name", "Phone", "Whatsapp", "Reference", "Status"]);
    const location = useLocation();
    const pageNumber = new URLSearchParams(location.search).get('page') || 1
    const status = new URLSearchParams(location.search).get('status')
    const navigate = useNavigate();

    const { isLoading, data: users, refetch } = useQuery({
        queryKey: ["users", filters, pageNumber],
        queryFn: async () => {
            if (filters?.reference) {
                const passbook = await api.post(`/users?page=${pageNumber}`, filters);
                setStatistics({
                    total: passbook.data.count,
                    active: passbook.data.active,
                    inactive: passbook.data.inactive,
                })
                return passbook.data
            }
            return {}
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
    const [open, setOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)
    const [whatsapp, setWhatsapp] = useState("")
    const [error, setError] = useState(false)
    const [country, setCountry] = useState("Bangladesh");
    const updateNumber = async () => {
        try {
            const res = await api.put(`/users/update/${selectedUser?._id}`, { whatsapp, "settings.messageError": true })
            toast.success(res.data.message)
            setOpen(false)
            refetch()
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
            setError(error?.response?.data?.message || "Something went wrong");
        }
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
                                                        {
                                                            user?.settings?.messageError === "false" && <button onClick={() => {
                                                                setOpen(true)
                                                                setSelectedUser(user)

                                                            }} className='btn btn-xs btn-secondary ml-3'>Update</button>
                                                        }
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
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
            <BlankDialog open={open} setOpen={setOpen}>
                <div className='p-5 text-black min-h-[400px]' >
                    <h1 className='text-center text-xl'>
                        Update Whatsapp Number
                    </h1>
                    {error}
                    <div className='mt-5 z-50'>
                        {/* <InputFeild
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}
                            label={"Whatsapp Number"}
                            name={"whatsapp"}
                        /> */}
                        <div className='mb-5'>
                            <Select label='Select Country' value={country} onChange={(e) => setCountry(e)}>
                                {
                                    countrys.map((country, index) => <Option key={index} value={country}>{country}</Option>)
                                }
                            </Select>
                        </div>
                        <PhoneNumberSelector
                            countrySelected={country}
                            state={whatsapp}
                            setState={setWhatsapp}
                        />
                        <button onClick={updateNumber} className='btn mx-auto block btn-primary btn-sm mt-5'>Update</button>
                    </div>
                </div>
            </BlankDialog>
        </React.Fragment>

    );
};

export default UsersTable;