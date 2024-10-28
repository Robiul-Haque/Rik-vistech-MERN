import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Logo from "../Brand/Logo";
import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
    Button,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function NavList({ onClick }) {
    const { user } = useSelector((state) => state.user);
    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                onClick={onClick}
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to={'/'} href="#" className="flex items-center text-black text-base hover:text-primary transition-colors">
                    Home
                </Link>
            </Typography>
            <Typography
                onClick={onClick}
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to={'/about'} href="#" className="flex items-center text-black text-base hover:text-primary transition-colors">
                    About
                </Link>
            </Typography>
            <Typography
                onClick={onClick}
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to={'/courses'} href="#" className="flex items-center text-black text-base hover:text-primary transition-colors">
                    Courses
                </Link>
            </Typography>
            <Typography
                onClick={onClick}
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to={'/apply-for'} href="#" className="flex items-center text-black text-base hover:text-primary transition-colors">
                    Sub Admins
                </Link>
            </Typography>
            <Typography
                onClick={onClick}
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-medium"
            >
                <Link to={'/contact'} href="#" className="flex items-center text-black text-base hover:text-primary transition-colors">
                    Contact
                </Link>
            </Typography>
            <Typography
                onClick={onClick}
                as="li"
                className="p-1 font-medium lg:ml-5"
            >
                {
                    user ?
                        <Link to={user?.role}>
                            <Button color="green" variant="filled"
                                className="bg-[#49d081]"
                            >
                                Dashboard
                            </Button>
                        </Link>
                        :
                        <div className="flex gap-4">
                            <Link to={'/login'}>
                                <Button color="green" variant="filled"
                                    className="bg-primary"
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link to={'/signup'}>
                                <Button color="green" variant="filled"
                                    className="bg-primary"
                                >
                                    Try For Free
                                </Button>
                            </Link>
                        </div>
                }

            </Typography>
        </ul>
    );
}

export function TopNavbar() {
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <Navbar
            variant="filled"
            color="transparent"
            className="fixed left-0 right-0 lg:top-3 top-0 z-10 h-max max-w-full rounded px-4 py-2 lg:px-8 lg:py-2 bg-white container mx-auto shadow-md">
            <div className="flex items-center justify-between text-black w-full bg-white">
                <Typography
                    onClick={() => setOpenNav(!openNav)}
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5"
                >
                    <Link to={'/'}>
                        <Logo width={'max-h-[80px]'} />
                    </Link>
                </Typography>
                <div className="hidden lg:block">
                    <NavList />
                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                        <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav} className="text-white">
                <NavList onClick={() => setOpenNav(false)}/>
            </Collapse>
        </Navbar>
    );
}
