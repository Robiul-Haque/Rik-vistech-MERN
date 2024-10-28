import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';
import { getRolename } from '../Admin/Components/UserProfileDialog';
import { Button, Input } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import Table from './Table';
import { api } from '../../../Components/axios/axios.instance';
import toast from 'react-hot-toast';
import Loader from '../../../Components/Shared/Loader';

const Count = ({ role }) => {
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
        if (userId || targertRole === "admin") {
            if (targertRole === "trainer") {
                const res = await check();
                if (!res) {
                    return
                }
                if (res?.settings?.gl === user?.userId) {
                    dataFetcher({
                        "settings.trainer": userId,
                    })
                }
                else {
                    toast.error("This user is not in your's")
                }
            }
            else if (targertRole === "gl") {
                dataFetcher({
                    "settings.gl": userId
                })
            }
            else if (targertRole === "consultant") {
                dataFetcher({
                    "settings.consultant": userId
                })
            }
            else if (targertRole === "admin") {
                dataFetcher({ role: "user" })
            }
            
            else if (targertRole === "user") {
                dataFetcher({ role: "user" })
            }
        }
    }
    if (loading) {
        return <Loader />
    }
    return (
        <div className='p-5'>
            <h1 className='text-3xl'>Count for : {getRolename(targertRole)}</h1>
            <div className="max-w-72 mt-5">
                {
                    targertRole !== "admin" && <Input label="Search with userid" value={userId} onChange={(e) => setUserId(e.target.value)} />
                }
                <Button onClick={findUser} style={{ marginTop: "10px" }}>
                    Search
                </Button>
            </div>
            {
                result !== null && result.count === 0 &&
                <p className='text-xs text-red-500 mt-5'>
                    No user's found or this user is not in your's.
                </p>
            }
            {
                result &&
                <Table users={result} />
            }
        </div>
    );
};

export default Count;