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
        label: "Active",
        value: "?status=active",
    },
    {
        label: "Inactive",
        value: "?status=inactive",
    },
];
const Header = ({ setDates, pageName, pn, filters, statistic }) => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("")

    let filtersOld;
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
    }, [userId, setDates])
    return (
        <div>
            <div className="mb-8 flex items-center justify-between gap-8">
                {/* <div>
                    {
                        pageName ? <Typography variant="h5" color="blue-gray">
                            {pageName}
                        </Typography>
                            :
                            <Typography variant="h5" color="blue-gray">
                                Trainers
                            </Typography>
                    }
                    {
                        !pageName && <div className='mt-2 flex gap-3'>
                            <Button color="cyan">
                                Total : {statistic?.count}
                            </Button>
                            <Button color="green">
                                Active : {statistic?.active}
                            </Button>
                            <Button color="red">
                                Inactive : {statistic?.inactive}
                            </Button>
                        </div>
                    }
                </div> */}

            </div>
            <div className="mt-8 flex justify-between lg:justify-start items-center gap-5">
                <div className="max-w-[300px] lg:max-w-[400px] w-full">
                    <Input
                        variant="outlined"
                        label={` Search Trainer`}
                        placeholder={" Search Trainer"}
                        onChange={(e) => setUserId(e.target.value)}
                        width={"100%"}
                    />
                </div>
                <button className='btn btn-sm btn-primary' onClick={searchUser}>
                    Find Trainer
                </button>
            </div>
        </div>
    );
};

export default Header;
