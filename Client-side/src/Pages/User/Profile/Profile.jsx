import React, { useEffect, useState } from 'react';
import TableRow from './TableRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faShare } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Loader from '../../../Components/Shared/Loader';
import toast from 'react-hot-toast';
import { whatsappLink } from '../../../helper/linkgenerateor';
import { getRolename } from '../../Dashboard/Admin/Components/UserProfileDialog';
import { imageUrl } from '../../../Components/Shared/imageUrl';
import Groups from '../Groups/Groups';
const Profile = ({ data }) => {
    const [user, setUser] = useState({});
    const { user: currentUser, noData } = useSelector((state) => state.user);
    const [referLink, setReferLink] = useState("");
    useEffect(() => {
        setReferLink(window.location.origin + "/signup?refer=" + user.userId);

    }, [user])
    const deviceHeight = window.innerHeight;

    useEffect(() => {
        if (data) {
            setUser(data)
        }
        else {
            setUser(currentUser)
        }
    }, [currentUser, data])
    if (noData) {
        return <Loader />
    }
    return (
        <main>
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-2xl leading-6 font-medium text-gray-900">
                    User Profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Details and informations about user.
                </p>
            </div>

            <div className="flex items-start h-full w-full justify-start">
                <div className="w-full">
                    <div className="bg-white shadow-xl rounded-lg py-3">
                        <div className="photo-wrapper p-2">
                            <img class="w-32 h-32 rounded border border-primary mx-auto" src={imageUrl(user?.image)}
                                alt={user?.firstName}
                            />
                        </div>
                        <div className="p-2">
                            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user.firstName + " " + user.lastName}</h3>
                            <div className="text-center text-cyan-700 text-sm font-semibold">
                                <p>{getRolename(user?.role)}</p>
                            </div>
                            <section className='mt-10'>
                                <Card title="Email" desc={user?.email} />
                                <Card title="Phone" desc={user?.phone} />
                                <Card title="Whatsapp" desc={user?.whatsapp} isError={true} />
                                <Card title="UserId" desc={user?.userId} />
                                <Card title="Country" desc={user?.country} />
                                <Card title="Reference" desc={user?.reference} />
                                <Card title="Team Leader" desc={user?.settings?.gl} />
                                <Card title="Trainer" desc={user?.settings?.trainer} />
                                {
                                    user?.status === "inactive" && <Card title="Counselor" desc={user?.settings?.consultant} />
                                }
                                {
                                    user?.status === "active" && user?.role === "user" && !data &&
                                    <div className='grid grid-cols-2 mb-3 gap-2'>
                                        <div className='border p-2'>
                                            Refer Link
                                        </div>
                                        <div className='border p-2'>
                                            <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center gap-3">
                                                <button onClick={() => whatsappLink(referLink)} className='btn lg:btn-sm btn-xs btn-primary'>
                                                    <FontAwesomeIcon className='ml-2 text-sm' icon={faShare} />
                                                    Share
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(referLink)
                                                        toast.success("Refer Link Copied!")
                                                    }
                                                    }
                                                    className='btn lg:btn-sm btn-xs btn-primary'>
                                                    Copy
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${deviceHeight < 700 ? "mt-[100px]" : "mt-10"}`}>
                {
                    user?.role === "user" && <Groups />
                }
            </div>
        </main>
    );
};

export default Profile;

const Card = ({ title, desc, isError }) => {
    return (
        <div className='grid grid-cols-2 mb-3 gap-2'>
            <div className='border p-2 lg:text-base text-sm'>
                {title}
            </div>
            <div className='border p-2 lg:text-base text-sm'>
                {desc}
            </div>
        </div>
    )
}