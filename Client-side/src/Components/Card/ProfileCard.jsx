import { useSelector } from 'react-redux';
import { Button } from '@material-tailwind/react';
import React from 'react';
import { BlankDialog } from '../Dialog/BlankDialog';
import UserTableSCU from '../../Pages/Dashboard/SeniorConsultent/Consultents/USER_TABLE_N';
import { imageUrl } from '../../Components/Shared/imageUrl';
const ProfileCard = ({ user, role, active, inactive, total, refetch, page }) => {
    const [open, setOpen] = React.useState(false);
    const {user: currentUser} = useSelector((state) => state.user);
    return (
        <div>
            <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm bg-white shadow-xl rounded-lg text-gray-900 mt-3 pb-5">
                <div className="rounded-t-lg h-32 overflow-hidden">
                    <img className="object-cover object-top w-full" src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" alt="Mountain" />
                </div>

                <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden bg-black">
                    <img className="object-cover object-center h-32" src={imageUrl(user?.image)} alt="Avater" />
                </div>
                <div className="text-center mt-2">
                    <h2 className="font-semibold">{user?.firstName + " " + user?.lastName}</h2>
                    <p className="text-gray-500">{role}</p>
                </div>
                <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
                    <li className="flex flex-col items-center justify-around">
                        <h1>Active</h1>
                        <div>{active}</div>
                    </li>
                    <li className="flex flex-col items-center justify-between">
                        <h1>Inactive</h1>
                        <div>{inactive}</div>
                    </li>
                    <li className="flex flex-col items-center justify-around">
                        <h1>Total</h1>
                        <div>{total}</div>
                    </li>
                </ul>
                <Button className='mx-auto block' onClick={() => setOpen(!open)}>
                    Assign some leads
                </Button>
            </div>
            <BlankDialog open={open} setOpen={setOpen} size={"xl"}>
                <UserTableSCU
                    filters={
                        page === "gl" ?
                            {
                                role: "user",
                                status: "active",
                                $or: [
                                    { "settings.gl": { $exists: false } },
                                    { "settings.gl": "" }
                                ]
                            }
                            :
                            page === "trainer" ?
                                {
                                    role: "user",
                                    status: "active",
                                    "settings.gl": currentUser?.userId,
                                    $or: [
                                        { "settings.trainer": { $exists: false } },
                                        { "settings.trainer": "" }
                                    ]
                                }
                                : page === "consultant" &&
                                {
                                    role: "user",
                                    status: "inactive",
                                    $or: [
                                        { "settings.consultant": { $exists: false } },
                                        { "settings.consultant": "" }
                                    ]
                                }
                    }
                    selected={user}
                    setOpen={setOpen}
                    refetch={refetch}
                    page={page}
                />
            </BlankDialog>
        </div>
    );
};

export default ProfileCard;