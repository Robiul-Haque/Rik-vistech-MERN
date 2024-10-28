// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ width, link }) => {
    return (
        <Link to={link ? link : "/"} title='Click To Go Home Page'>
            <img src={'/images/logo/visteac-2.png'} className={`${width || "w-[120px]"}  h-auto`} alt="Dynamic Vistech E-learning platform" />
        </Link>
    );
};

export default Logo;

export const LogoSm = ({ width, link }) => {
    return (
        <Link to={link ? link : "/"} title='Click To Go Home Page'>
            <img src={'/images/logo/visteac-2.png'} className={`${width || "w-[70px]"}  h-auto`} alt="Dynamic Vistech E-learning platform" />
        </Link>
    );
};