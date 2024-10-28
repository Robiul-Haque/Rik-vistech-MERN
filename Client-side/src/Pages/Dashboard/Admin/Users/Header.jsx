import { useSelector } from 'react-redux';
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Tab,
    Tabs,
    TabsHeader,
    Input,
    Typography,
    Button,
} from "@material-tailwind/react";
import { api } from '../../../../Components/axios/axios.instance';

const TABS = [
    {
        label: "Active User",
        value: "?status=active",
    },
    {
        label: "Inactive User",
        value: "?status=inactive",
    },
];
const Header = ({ setDates, pageName, pn, filters, statistics }) => {
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate();
    const [statistic, setStatistic] = useState({})
    const [stForManager, setStForManager] = useState({
        total: 0,
        active: 0,
        inactive: 0,
    })
    const [userId, setUserId] = useState("")
    useEffect(() => {
        if (!pageName) {
            (
                async () => {
                    try {
                        if (user?.role === "manager") {
                            const date = new Date();
                            const res = await api.post(`/users/statistic`, {
                                role: "user",
                                createdAt: {
                                    $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                                    $lt: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
                                }
                            });
                            setStForManager(res.data);
                        }
                        else if (user?.role === "gl") {
                            const res = await api.post(`/users/statistic`, {
                                role: "user",
                                "settings.gl": user?.userId
                            });
                            setStatistic(res.data)
                        }
                        else {
                            if (pn) {
                                const res = await api.post(`/users/statistic`, filters);
                                setStatistic(res.data);
                            }
                            else {
                                const res = await api.get(`/users/statistic`);
                                setStatistic(res.data);
                            }
                        }
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
            )()
        }

    }, [pageName, filters, pn, user])
    const searchUser = async (e) => {
        setDates(prev => ({
            ...prev, $or: [
                {
                    email: userId
                },
                {
                    userId: userId
                }
            ]
        }))
    }
    useEffect(() => {
        if (!userId) {
            const newState = { ...filters };
            // Remove the property
            delete newState["$or"];
            // Update the state
            setDates(newState);
        };
    }, [userId])
    return (
        <div>
            <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                    {
                        pageName ? <Typography variant="h5" color="blue-gray">
                            {pageName}
                        </Typography>
                            :
                            <Typography variant="h5" color="blue-gray">
                                User Management
                            </Typography>
                    }
                    {
                        user?.role !== "manager" ?
                            !pageName && <div className='mt-2 flex gap-3'>
                                <Button color="white" className='py-5 shadow shadow-blue-gray-300'>
                                    Total : {statistic.total}
                                </Button>
                                <Button color="green">
                                    Active : {statistic.active}
                                </Button>
                                <Button color="white" className='py-5 shadow shadow-blue-gray-300 text-red-600' >
                                    Inactive : {statistic.inactive}
                                </Button>
                            </div>
                            :
                            <div className='mt-2 flex gap-3'>
                                <Button color="cyan">
                                    Total : {stForManager?.total}
                                </Button>
                                <Button color="green">
                                    Active : {stForManager?.active}
                                </Button>
                                <Button color="red">
                                    Inactive : {stForManager?.inactive}
                                </Button>
                            </div>
                    }
                </div>

            </div>
            {
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    {
                        !pageName &&
                        <Tabs value={location.pathname + location.search} className="w-full max-w-md">
                            <TabsHeader >
                                {TABS.map(({ label, value }) => (
                                    <Tab key={value} value={value} onClick={() => navigate(value)}>
                                        <Link to={value}>
                                            &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                        </Link>
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>}
                    {
                        user?.role !== "manager" && <div className="w-auto lg:flex flex-col lg:flex-row lg:items-center gap-4">
                            <div className="w-full mb-5 lg:mb-0">
                                <Input
                                    label="Start Date"
                                    type="date"
                                    size="md"
                                    onChange={(e) => setDates((prev) => ({ ...prev, startDate: e.target.value }))}
                                />
                            </div>
                            <Input
                                label="End Date"
                                type="date"
                                size="md"
                                onChange={(e) => setDates((prev) => ({ ...prev, endDate: e.target.value }))}
                            />
                        </div>
                    }
                </div>
            }
            <div className="mt-8 flex justify-between lg:justify-start items-center gap-5">
                <div className="max-w-[300px] lg:max-w-[400px] w-full">
                    <Input
                        variant="outlined"
                        label={pageName ? `Search ${pageName}` : "Search User"}
                        placeholder={pageName ? `Search With ${pageName} id` : "Search With User id"}
                        onChange={(e) => setUserId(e.target.value)}
                        width={"100%"}
                    />
                </div>
                <button className='btn btn-sm btn-primary' onClick={searchUser}>
                    Find User
                </button>
            </div>
        </div>
    );
};

export default Header;
