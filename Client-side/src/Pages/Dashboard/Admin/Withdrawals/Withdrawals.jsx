
import { Button, CardBody, CardFooter, Chip, IconButton, Tooltip, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { api } from '../../../../Components/axios/axios.instance';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../../Components/Shared/Loader';
import toast from 'react-hot-toast';

const TABLE_HEAD = ["Date", "Userid", "Name", "Amount", "Method", "Number", "Status", ""];
const Withdrawals = () => {
    const { user } = useSelector((state) => state.user);
    const { isLoading, data: cradits, refetch } = useQuery({
        queryKey: ["withdraw-all"],
        queryFn: async () => {
            const passbook = await api.get(`/withdraw`);
            return passbook?.data?.reverse() || [];
        }
    })
    const withdrawAction = async (id, type) => {
        try {
            if (type === "accept") {
                const res = await api.put(`/withdraw/accept/${id}`)
                toast.success(res.data.message)
                refetch();
            }
            else {
                const res = await api.put(`/withdraw/reject/${id}`)
                toast.success(res.data.message)
                refetch();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    }
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='p-5'>
            <CardBody className="overflow-scroll px-0">
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
                        {cradits.map(
                            (
                                {
                                    name,
                                    createdAt,
                                    status,
                                    withdraw,
                                    user,
                                    amount,
                                    method,
                                    account,
                                    _id
                                },
                                index,
                            ) => {
                                const isLast = index === cradits.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={_id}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {moment(createdAt).format("DD/MM/YYYY hh:mm A")}
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
                                            <div className="flex items-center gap-3">

                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {user?.firstName + " " + user?.lastName}
                                                </Typography>
                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {amount}
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
                                                        {method}
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
                                                {account}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className='flex flex-col items-center'>
                                                <div className="w-max">
                                                    <Chip
                                                        size="sm"
                                                        variant="ghost"
                                                        value={status}
                                                        color={
                                                            status === "accepted"
                                                                ? "green"
                                                                : status === "pending"
                                                                    ? "amber"
                                                                    : "red"
                                                        }
                                                    />
                                                </div>
                                                {
                                                    status === "pending" &&
                                                    <div className="flex mt-2 gap-2">
                                                        <button
                                                            onClick={() => withdrawAction(_id, "accept")}
                                                            className='btn btn-primary btn-xs'>
                                                            Accept
                                                        </button>
                                                        <button className='btn btn-error text-white btn-xs'
                                                            onClick={() => withdrawAction(_id, "reject")}
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                );
                            },
                        )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Button variant="outlined" size="sm">
                    Previous
                </Button>
                <div className="flex items-center gap-2">
                    <IconButton variant="outlined" size="sm">
                        1
                    </IconButton>
                </div>
                <Button variant="outlined" size="sm">
                    Next
                </Button>
            </CardFooter>
        </div>

    );
};

export default Withdrawals;