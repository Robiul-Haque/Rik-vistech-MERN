
import { Button, CardBody, CardFooter, Chip, IconButton, Tooltip, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { api } from '../../../Components/axios/axios.instance';
import { useSelector } from 'react-redux';
import moment from 'moment/moment';

const TABLE_HEAD = ["No", "Date", "Amount", "Method", "Number", "Status", ""];
const Dabit = () => {
    const { user } = useSelector((state) => state.user);
    const [cradits, setCradits] = useState([]);
    useEffect(() => {
        (
            async () => {
                try {
                    if (user) {
                        const passbook = await api.get(`/passbook/debit/${user?._id}`);
                        setCradits(passbook.data.passbook);
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
        )()
    }, [user])
    return (
        <React.Fragment>
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
                                    amount,
                                    createdAt,
                                    status,
                                    account,
                                    method,
                                    withdraw
                                },
                                index,
                            ) => {
                                const isLast = index === cradits.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={name}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">

                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-bold"
                                                >
                                                    {index + 1}
                                                </Typography>
                                            </div>
                                        </td>
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
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {withdraw?.amount}
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
                                                        {withdraw?.method}
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
                                                {withdraw?.account}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    size="sm"
                                                    variant="ghost"
                                                    value={withdraw?.status}
                                                    color={
                                                        withdraw?.status === "accepted"
                                                            ? "green"
                                                            : withdraw?.status === "pending"
                                                                ? "amber"
                                                                : "red"
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
        </React.Fragment>

    );
};

export default Dabit;