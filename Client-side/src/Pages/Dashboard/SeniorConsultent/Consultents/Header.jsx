import React from 'react';
import ProfileCard from '../../../../Components/Card/ProfileCard';
import { getRolename } from '../../Admin/Components/UserProfileDialog';

const Header = ({ user, data, refetch, page }) => {
    return (
        <div>
            <ProfileCard
                user={user}
                role={page ? getRolename(page) : "Consultant"}
                active={data?.active}
                inactive={data?.inactive}
                total={data?.count}
                refetch={refetch}
                page={page}
            />
        </div>
    );
};

export default Header;