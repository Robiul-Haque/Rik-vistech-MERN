/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from "react";
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    Card, List, ListItem, ListItemPrefix, Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../../Components/Brand/Logo";
import { logOutUser, refreshUser } from "../../../../redux/features/user/userSlice";
import { imageUrl } from "../../../../Components/Shared/imageUrl";
import { ChevronDownIcon, ChevronRightIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { api, apiUpload } from "../../../../Components/axios/axios.instance";
import { getRolename } from "./UserProfileDialog";


export function Sidebar({ setShow }) {
    const [active, setActive] = useState(1);
    const path = useLocation();

    const dispatch = useDispatch();
    const { user, wallet } = useSelector((state) => state.user);
    const [publicImage, setPublicImage] = useState("");
    const [image, setImage] = useState(null);

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

    const updateProfile = async () => {
        try {
            const formData = new FormData();
            formData.append("image", image);
            const response = await apiUpload.post('/upload', formData);
            const res = await api.put(`/users/update/${user._id}`, { image: response.data.path, user: user._id });
            toast.success(res?.data.message);
            dispatch(refreshUser(res.data));
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    const navigate = useNavigate();
    const deviceType = window.innerWidth <= 768 ? "mobile" : "desktop";
    if (!user) {
        return <Loader />
    }
    return (
        <Card className="h-[100vh] w-full max-w-[20rem] min-w-[16rem] p-4 shadow-xl shadow-blue-gray-900/5 overflow-y-auto pb-5 bg-black text-white">
            <div className=" flex items-center gap-4 p-4 justify-center">
                <div className="bg-white p-2 rounded-full w-[130px] h-[130px]">
                    <Logo link={"/user"} />
                </div>
            </div>
            <div className='w-[100px] h-[100px] min-h-[100px] rounded-full overflow-hidden border mx-auto profile-pic border-primary'
                style={{
                    backgroundImage: `url('${publicImage ? publicImage : imageUrl(user.image)}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <label htmlFor='profile' className="overlay w-full h-full">
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
            <h2 className='mt-2 text-sm font-semibold text-center'>Role : {getRolename(user?.role)}</h2><h2 className='mt-2 text-sm text-center'>Balance : {user?.balance}</h2>
            <div className='w-full flex flex-col gap-y-1 mt-10 '>
                <List className="p-0 text-white">
                    {
                        user?.role === "admin" &&
                        adminLinks.map((link, index) => (
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
                    {
                        user?.role === "sc" &&
                        scLinks.map((link, index) => (
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
                    {
                        user?.role === "consultant" &&
                        consultantLinks.map((link, index) => (
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
                    } {
                        user?.role === "gl" &&
                        glLinks.map((link, index) => (
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
                    }{
                        user?.role === "sgl" &&
                        sglLinks.map((link, index) => (
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
                    {
                        user?.role === "teacher" &&
                        course.map((link, index) => (
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
                    {
                        user?.role === "checker" &&
                        checker.map((link, index) => (
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
                    } {
                        user?.role === "cm" &&
                        cm.map((link, index) => (
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
                    }{
                        user?.role === "trainer" &&
                        trainer.map((link, index) => (
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
                    }{
                        user?.role === "manager" &&
                        manager.map((link, index) => (
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
                {
                    links.map((link, index) => (
                        <NavLink onClick={() => {
                            if (deviceType === "mobile") {
                                setShow(false);
                            }
                        }} key={index}
                            to={link.path} className={`w-full px-5 py-2 hover:bg-primary hover:text-white text-white  ${path.pathname === link.path ? "bg-primary text-white font-normal" : ""}`}>
                            {link.name}
                        </NavLink>
                    ))
                }
                <button
                    onClick={() => dispatch(logOutUser())}
                    className='btn btn-error rounded-none text-white btn-sm mt-10'> Logout
                </button>
            </div>
        </Card>
    );
}

const scLinks = [
    {
        name: "Counselor",
        path: "consultants"
    },
    {
        name: "Request List",
        path: "requests"
    },
    {
        name: "Search",
        path: "search"
    },
    {
        name: "Count",
        path: "count",
    }
]

const glLinks = [
    {
        name: "Trainers",
        path: "trainers",
    },
    {
        name: "User Management",
        path: "users",
    },
    {
        name: "Statistics",
        path: "statistics",
    },
    {
        name: "Search",
        path: "search"
    }
]
const trainer = [
    {
        name: "Users",
        path: "users",
    },
    {
        name: "Statistics",
        path: "statistics",
    }
]
const cm = [
    {
        name: "Senior Counselor",
        path: "sc"
    },
    {
        name: "Search",
        path: "search"
    },
    {
        name: "Counselor",
        path: "consultants"
    }
]
const course = [
    {
        name: "Course",
        path: "course",
    },
]
const checker = [
    {
        name: "Assignments",
        path: "assignments",
    },
]
const manager = [
    {
        name: "User Management",
        path: "users",
    }
]
const sglLinks = [
    {
        name: "Team Leaders",
        path: "gl",
    },
    {
        name: "Search",
        path: "search"
    },
    {
        name: "Count",
        path: "count",
    }
]
const consultantLinks = [
    {
        name: "User Management",
        path: "users",
    },
    {
        name: "Statistics",
        path: "statistics",
    },
    {
        name: "Request ",
        path: "requests",
    }, {
        name: "Time Zone",
        path: "time-zone",
    }
]

const adminLinks = [
    {
        name: "Users",
        path: "users",
    },
    {
        name: "Search",
        path: "search"
    },
    {
        name: "Senior Counselor",
        path: "sc"
    },
    {
        name: "Counselor",
        path: "consultants"
    },

    {
        name: "Senior Team Leaders",
        path: "sgl"
    },
    {
        name: "Team Leaders",
        path: "gl"
    },
    {
        name: "Teachers",
        path: "teachers"
    },
    {
        name: "Managers",
        path: "manager"
    }, {
        name: "Checker",
        path: "checker"
    }, {
        name: "Trainer",
        path: "trainer"
    },

    {
        name: "Count",
        path: "count",
    },
    {
        name: "Withdrawals",
        path: "withdrawals",
    },
    {
        name: "Courses",
        path: "courses",
    },
    {
        name: "Whatsapp Groups",
        path: "groups",
    },
    {
        name: "Site Management",
        path: "settings",
    },
    {
        name: "Notice",
        path: "notice",
    },
]

export const links = [
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
        name: "Change Password",
        path: "password"
    },

]