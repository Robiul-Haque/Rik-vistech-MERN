import React from 'react';
import { Outlet } from 'react-router-dom';
// import Sidebar from './Bars/Sidebar';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { UserSidebar } from './Bars/User.Sidebar';
import { useSelector } from 'react-redux';
import Loader from '../../Components/Shared/Loader';
const User = () => {
    const [show, setShow] = React.useState(false);
    const { user, settings } = useSelector(state => state.user)
    if (user?.locked) {
        return <div className='h-screen gradint-bg lg:flex w-full text-black flex justify-center items-center'>
            <div className='flex flex-col items-center'>
                <h1 className='text-3xl'>
                    Your Account is Locked
                </h1>
                <button className='btn btn-primary mx-auto mt-5'
                    onClick={() => window.open(`${settings?.whatsapp}`, "_blank")}
                >Contact Support</button>
                <button className='btn btn-primary mx-auto mt-5'
                    onClick={() => window.location.href = "/"}
                >Back To Home</button>
            </div>
        </div>
    }
    if (!user) {
        return <Loader />
    }
    return (
        <main className='gradint-bg lg:flex w-full h-full gap-5 text-black  overflow-hidden'>
            <div className="w-full h-full lg:w-auto">
                <div className="bg-white py-4 px-5 text-black lg:hidden">
                    <Bars3Icon className="w-9 h-9" onClick={() => setShow(!show)} />
                </div>
                <div className={`flex justify-between fixed h-screen lg:h-auto lg:static top-0 left-0 gradint-bg w-full z-[999] lg:block ${show ? "block" : "hidden"}`}>
                    <UserSidebar setShow={setShow} />
                    <button onClick={() => setShow(false)} className='max-h-[30px] mr-5 mt-5 lg:hidden'>
                        <XMarkIcon className="w-7 h-7 text-black" />
                    </button>
                </div>
            </div>
            <div className="col-span-10 h-full overflow-y-auto w-full lg:p-5 p-4 gradint-bg pb-[150px] ">
                <Outlet />
            </div>
        </main>
    );
};

export default User;
