
import {
    Card,
    CardHeader,
    Typography,

    Tab,
    Tabs,
    TabsHeader,
    Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const TABS = [
    {
        label: "Debit History",
        value: "debit",
    },
    {
        label: "Cradit History",
        value: "cradit",
    },
];


export default function Passbook() {
    const [value, setValue] = useState("");
    const [startDate, setStartDate] = useState("");

    const handlerChanges = () => {
        // console.log(value, startDate);
    };
    const location = useLocation();
    useEffect(() => {
        if (value || startDate) {
            handlerChanges();
        }
    }, [value, startDate]);
    const navigate = useNavigate();
    return (
        <Card className="w-full p-5 bg-transparent">
            <CardHeader floated={false} shadow={false} className="rounded-none bg-transparent">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Cradit & Debit History
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See all you have cradited and debited
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row bg-transparent">
                    <Tabs value={location.pathname === TABS[0].value || location.pathname === TABS[1].value ? location.pathname : TABS[1].value} className="w-full max-w-md mb-10 ">
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
                    <div className="w-auto lg:flex lg:flex-row flex-col lg:items-center gap-4">
                        <div className="w-full mb-5 lg:mb-0">
                            <Input
                                label="Start Date"
                                type="date"
                                size="md"
                                onChange={(e) => setStartDate(new Date(e.target.value))}
                            />
                        </div>
                        <Input
                            label="End Date"
                            type="date"
                            size="md"
                            onChange={(e) => setValue(new Date(e.target.value))}
                        />
                    </div>
                </div>
            </CardHeader>
            <Outlet />
        </Card>
    );
}