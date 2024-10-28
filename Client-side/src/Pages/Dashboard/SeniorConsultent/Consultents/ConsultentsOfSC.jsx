import React, { useEffect, useState } from 'react';
import Header from '../../Admin/Users/Header';
import Table from './Table';
import { useSelector } from 'react-redux';
import { getRolename } from '../../Admin/Components/UserProfileDialog';


const ConsultantOSC = ({ page }) => {
    const { user } = useSelector((state) => state.user)
    const [filters, setFilters] = useState({

    })
    useEffect(() => {
        if (page === "gl") {
            if (user?.role === "sgl") {
                setFilters({
                    role: "gl",
                    "settings.sgl": user?.userId,
                })
            }
            else {
                setFilters({
                    role: "gl"
                })
            }
        }
        else if (page === "trainer") {
            setFilters({
                role: "trainer",
                "settings.gl": user?.userId
            })
        }
        else {
            setFilters({
                role: "consultant"
            })
        }
    }, [page, user])
    return (
        <div className='p-5'>
            <Header pageName={page ? getRolename(page) : "Counselor"} setDates={setFilters} filters={filters} />
            <Table filters={filters} pageName={page ? page : "sc"} />
        </div>
    );
};

export default ConsultantOSC;