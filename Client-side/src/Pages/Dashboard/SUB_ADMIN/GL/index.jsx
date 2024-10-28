import React from 'react';
import Header from '../../Admin/Users/Header';
import Table from '../../SeniorConsultent/Consultents/Table';

const GroupLeaderPage = () => {
    const [filters, setFilters] = useState({
        role: "gl"
    })
    useEffect(() => {
        setFilters({
            role: "gl"
        })
    }, [])
    return (
        <div className='p-5'>
            <Header pageName={"Counselor"} setDates={setFilters} />
            <Table filters={filters} pageName={"sc"} />
        </div>
    );
};

export default GroupLeaderPage;
