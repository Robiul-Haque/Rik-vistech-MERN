
import { CardBody, Chip,  Typography } from '@material-tailwind/react';
import React, { useEffect } from 'react';
import moment from 'moment/moment';

const TABLE_HEAD = ["Date", "Title", "Marks", "Status"];

const AssignmentHistory = ({ data }) => {
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
                        {data?.map(
                            (
                                assignment,
                                index,
                            ) => {
                                const isLast = index === data.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";
                                return (
                                    <tr key={index}>

                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {moment(assignment?.createdAt).format("DD/MM/YYYY hh:mm A")}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {assignment?.course?.title}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {
                                                    assignment?.status === "pending" ? "Pending" :
                                                        assignment?.marks
                                                }
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    size="sm"
                                                    variant="ghost"
                                                    value={assignment?.status}
                                                    color={
                                                        assignment?.status === "pending" ? "yellow" :
                                                            assignment?.status === "completed" ? "green" :
                                                                assignment?.status === "rejected" ? "red" :
                                                                    "yellow"
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
        </React.Fragment>

    );
};

export default AssignmentHistory;