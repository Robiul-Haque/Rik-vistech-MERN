
import { Button, CardBody, CardFooter, Chip, IconButton, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../../../../../Components/Shared/Loader';
import { api } from '../../../../../Components/axios/axios.instance';
import moment from 'moment';
import { BlankDialog } from '../../../../../Components/Dialog/BlankDialog';
import AssDetails from './AssDetails';
const TABLE_HEAD = ["Name", "User id", "Whatsapp", "Status", "Assignment"];

const AssignmentTable = () => {
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const pageNumber = new URLSearchParams(location.search).get('page')
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        course: user?.course?._id
    })

    const { isLoading, data: assignments, refetch } = useQuery({
        queryKey: ["assignments", filters, pageNumber, user?.course?._id],
        queryFn: async () => {
            const passbook = await api.post(`/assignment/get?page=${pageNumber}`, {
                course: user?.course?._id
            });
            return passbook.data
        }
    })

    const pagesList = () => {
        const pages = [];
        for (let i = 0; i < 1; i++) {
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
    const [open, setOpen] = useState(false);
    const [assignment, setAssignment] = useState(null);
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
                <h1 className='py-3'>Total Result : {assignments?.length}</h1>
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
                        {
                            assignments?.reverse()?.map((assignment) => (
                                <tr>
                                    <td className="border-b border-blue-gray-50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {moment(assignment?.createdAt).format("DD-MM-YYYY hh:mm A")}
                                        </Typography>
                                    </td> <td className="border-b border-blue-gray-50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {assignment?.student?.userId}
                                        </Typography>
                                    </td>
                                    <td className="border-b border-blue-gray-50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {assignment?.student?.whatsapp}
                                        </Typography>
                                    </td> <td >
                                        <div className="w-max">
                                            <Chip
                                                size="sm"
                                                variant="ghost"
                                                value={assignment?.status}
                                                color={
                                                    assignment?.status === "accepted"
                                                        ? "green"
                                                        : assignment?.status === "pending"
                                                            ? "amber"
                                                            : "red"
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td className="border-b border-blue-gray-50 p-4">
                                        <button
                                            onClick={() => {
                                                setOpen(true)
                                                setAssignment(assignment)
                                            }}
                                            className='btn btn-sm btn-primary'>
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </CardBody>
            <BlankDialog open={open} setOpen={setOpen}>
                <AssDetails setOpen={setOpen} assgnment={assignment} refetch={refetch} />
            </BlankDialog>
        </React.Fragment>

    );
};

export default AssignmentTable;

