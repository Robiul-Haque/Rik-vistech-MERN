import React, { useEffect } from 'react';
import Loader from '../Shared/Loader';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


const VerifyUser = ({ children }) => {

    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            if (user?.role !== "user") {
                navigate(`/${user?.role}`)
            }
        }
    }, [user, navigate])
    if (!user) {
        return <Loader />
    }
    if (user) {
        return children;
    }
};

export default VerifyUser;