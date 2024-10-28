import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    Card, List, ListItem, ListItemPrefix, Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../Components/Brand/Logo";
import { logOutUser, refreshUser } from "../../../redux/features/user/userSlice";
import { imageUrl } from "../../../Components/Shared/imageUrl";
import { api, apiUpload } from "../../../Components/axios/axios.instance";
import toast from "react-hot-toast";
import { ChevronDownIcon, ChevronRightIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export function UserSidebar({ setShow }) {
    const path = useLocation();
    const dispatch = useDispatch();
    const { user, wallet } = useSelector((state) => state.user);
    const [publicImage, setPublicImage] = useState("");
    const [image, setImage] = useState(null);
    const [inactiveUser, setInactiveUser] = useState(false);
    useEffect(() => {
        try {
            if (image) {
                const url = URL.createObjectURL(image)
                setPublicImage(url)
            }
        } catch (error) {
            console.error(error);
        }
    }, [image]);
    useEffect(() => {
        if (user?.status === "active" && user?.role === "user") {
            setInactiveUser(false)
        }
        else {
            setInactiveUser(true)
        }
    }, [user])
    const navigate = useNavigate();
    const updateProfile = async () => {
        try {
            const formData = new FormData();
            formData.append("image", image);
            const response = await apiUpload.post('/upload', formData);
            const res = await api.put(`/users/update/${user._id}`, { image: response.data.path, user: user._id });
            toast.success(res?.data?.message);
            dispatch(refreshUser(res?.data));
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
            console.log(error);
        }
    }
    const deviceType = window.innerWidth <= 768 ? "mobile" : "desktop";
    const [open, setOpen] = useState(deviceType === "desktop" ? true : false);
    if (!user) {
        return <Loader />
    }
    return (
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] min-w-[16rem] p-4 shadow-xl bg-black text-white">
            <div className="mb-2 flex items-center gap-4 p-4 justify-center">
                <Logo link={"/user"} />
            </div>
            <div className='w-[100px] h-[100px] rounded-full overflow-hidden  border border-primary mx-auto profile-pic'
                style={{
                    backgroundImage: `url('${publicImage ? publicImage : imageUrl(user.image)}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <label htmlFor='profile' className="overlay">
                    <button>
                        <img src="/images/icons/camera.png" alt="" />
                    </button>
                    <p>Change</p>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        id='profile' type="file" className='hidden'
                        accept="image/*"
                    />
                </label>

            </div>
            {
                image && <button onClick={updateProfile} className='btn btn-primary rounded-none text-white btn-sm mx-auto mt-2'>Change Image</button>
            }
            <h1 className='text-center mt-3 text-base uppercase font-semibold'>
                {user.firstName + " " + user.lastName}
            </h1>
            <h2 className='mt-2 text-sm text-center'>Balance : {user.balance}</h2>
            <Accordion
                open={open}

                icon={
                    <ChevronDownIcon

                        strokeWidth={2.5}
                        className={`mx-auto text-white h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                    />
                }

            >
                <ListItem className="p-0 " 
                    onClick={() => {
                        if (deviceType === "mobile") {
                            // setShow(false);
                        }
                    }}
                >
                    <AccordionHeader className="border-b-0 p-3"
                        onClick={() => setOpen(open === 1 ? 0 : 1)}
                    >
                        <ListItemPrefix>
                            <UserGroupIcon className="h-5 w-5 text-white" />
                        </ListItemPrefix>
                        <Typography color="blue-gray" className="mr-auto font-normal text-white">
                            Dashboard
                        </Typography>
                    </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1"
                  
                >
                    <List className="p-0 text-white">
                        {
                             !inactiveUser ?

                            links.map((link, index) => (
                                <ListItem key={index} onClick={() => {
                                    if (deviceType === "mobile") {
                                        setShow(false);
                                    }
                                    navigate(link.path)
                                }}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    {link.name}
                                </ListItem>
                            ))
                            :
                            links2.map((link, index) => (
                                <ListItem key={index} onClick={() => {
                                    if (deviceType === "mobile") {
                                        setShow(false);
                                    }
                                    navigate(link.path)
                                }}>
                                    <ListItemPrefix>
                                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                                    </ListItemPrefix>
                                    {link.name}
                                </ListItem>
                            ))
                        }

                    </List>
                </AccordionBody>
            </Accordion>
            <div className='w-full flex flex-col gap-y-1 mt-10'>
              
                <button
                    onClick={() => dispatch(logOutUser())}
                    className='btn btn-error rounded-none text-white btn-sm mt-10'> Logout
                </button>
            </div>
        </Card>
    );
}


const links = [
    {
        name: "Profile",
        path: "profile"
    },
    {
        name: "Passbook",
        path: "passbook"
    },
    {
        name: "Withdrawal",
        path: "withdraw"
    },
    {
        name: "Reference History",
        path: "ref-history"
    },
    {
        name: "Classes",
        path: "classes"
    },{
        name: "Courses",
        path: "courses"
    },
    {
        name: "Change Password",
        path: "password"
    }

]
const links2 = [
    {
        name: "Profile",
        path: "profile"
    },
    {
        name: "Change Password",
        path: "password"
    }

]