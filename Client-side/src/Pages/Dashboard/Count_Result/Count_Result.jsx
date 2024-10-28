import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';

import { Button, Input } from '@material-tailwind/react';
import { useSelector } from 'react-redux';

import toast from 'react-hot-toast';
import { api } from '../../../Components/axios/axios.instance';
import Loader from '../../../Components/Shared/Loader';
import Table from '../Count/Table';


const Statistics = ({ role }) => {
    const [targertRole, setTergertRole] = React.useState("");
    const [userId, setUserId] = React.useState("");
    const { user } = useSelector((state) => state.user)
    const location = useLocation();
    const [result, setResult] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const page = new URLSearchParams(location.search).get('page') || 1
    useEffect(() => {
        setTergertRole(role)
    }, [role])
    const check = async () => {
        try {
            const res = await api.get(`/users/${userId}`);
            return res.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
            return null;
        }
    }
    const navigate = useNavigate();
    const dataFetcher = async (query) => {
        try {
            setLoading(true)
            const res = await api.post(`/users/count?page=${page}`, query);
            const updatedQuery = new URLSearchParams({
                page: 1,
            })
            navigate(`${location.pathname}?${updatedQuery}`);
            setLoading(false)
            setResult(res.data)
        } catch (error) {
            setLoading(false)
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
    }
    const findUser = async () => {
        if (user?.role === "trainer") {
            dataFetcher({
                "settings.trainer": user?.userId,
            })
        }
        else if (user?.role === "gl") {
            dataFetcher({
                "settings.gl": user?.userId,
            })
        }
        else if (user?.role === "sgl") {
            dataFetcher({
                "settings.gl": user?.userId,
            })
        }
        else if (user?.role === "counsultant") {
            dataFetcher({
                "settings.counsultant": user?.userId,
            })
        }
    }
    if (loading) {
        return <Loader />
    }
    return (
        <div className='p-5'>
            <h1 className='text-3xl'>Count for <span className='text-primary'>
                ({user?.firstName + " " + user?.lastName})</span></h1>
            <div className="max-w-72 mt-5">
                <Button className='btn-primary' onClick={findUser} style={{ marginTop: "10px" }}>
                    Search
                </Button>
            </div>
            {
                result &&
                <Table users={result} />
            }
        </div>
    );
};

export default Statistics;