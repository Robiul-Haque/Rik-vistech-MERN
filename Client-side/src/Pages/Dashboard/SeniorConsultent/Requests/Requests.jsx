import React from 'react';
import Requesttable from './RequestTable';

const Requests = () => {
    return (
        <div className="p-5">
            <h1 className="mb-4 text-2xl font-semibold">Requests</h1>
            <Requesttable />
        </div>
    );
};

export default Requests;