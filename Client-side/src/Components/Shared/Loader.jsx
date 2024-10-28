import React from 'react';

import { Spinner } from "@material-tailwind/react";
const Loader = () => {
    return (
        <div className='w-full h-screen fixed top-0 left-0 flex items-center justify-center gradint-bg z-[100]'>
            <Spinner className="h-8 w-8" />
        </div>
    );
};

export default Loader;