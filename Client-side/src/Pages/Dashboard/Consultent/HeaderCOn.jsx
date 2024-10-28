import React from 'react';
import {
    Input,
    Typography,
    Button,
} from "@material-tailwind/react";

const HeaderCon = ({ data, setDates }) => {
    const pageName = "User";
    return (
        <div>
            <div className="mb-8 flex items-center justify-between gap-8">
                <div>
                    {
                        <Typography variant="h5" color="blue-gray">
                            User Management
                        </Typography>
                    }
                    {
                        <div className='mt-2 flex gap-3'>
                            <Button color="cyan">
                                Total : {data?.count}
                            </Button>
                            <Button color="green">
                                Message Sent : {data?.active}
                            </Button>
                            <Button color="red">
                                Not Complete : {data?.inactive}
                            </Button>
                        </div>
                    }
                </div>

            </div>
            {
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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
            <div className="mt-8">
                <Input
                    variant="static"
                    size="xs"
                    label={pageName ? `Search ${pageName}` : "Search User"}
                    placeholder={pageName ? `Search With ${pageName} id` : "Search With User id"}
                    onChange={(e) => setDates((prev) => ({
                        ...prev, userId: {
                            $regex: e.target.value
                        },
                    }))}
                />
            </div>
        </div>
    );
};

export default HeaderCon;
