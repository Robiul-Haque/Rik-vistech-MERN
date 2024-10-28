import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Tab,
    Tabs,
    TabsHeader,
    Input,
    Typography,
    Button,
} from "@material-tailwind/react";
import { useSelector } from 'react-redux';

const TABS = [
    {
        label: "Active",
        value: "?status=active",
    },
    {
        label: "Inactive",
        value: "?status=inactive",
    },
];
const Header = ({ setDates, pageName, role, user }) => {
    const navigate = useNavigate();
    const location = useLocation().search;
    const { user: currentUser } = useSelector((state) => state.user)
    const [userId, setUserId] = useState("")
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
        if (currentUser?.role === "gl") {
            if (!userId) {
                setDates({
                    role: role,
                    "settings.sgl": user
                })
            }
        }
        else if (currentUser?.role === "trainer") {
            if (!userId) {
                setDates({
                    role: "user",
                    "settings.trainer": currentUser?.userId
                })
            }
        }

    }, [userId, role, user, setDates, currentUser])
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
                </div>

            </div>
            {
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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
                    </Tabs>
                    <div className="w-auto lg:flex flex-col lg:flex-row lg:items-center gap-4">
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
