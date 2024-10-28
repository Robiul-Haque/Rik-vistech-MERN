import React from 'react';

const TableRow = ({ title, value }) => {
    return (
        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 shadow-sm">
            <dt className="text-sm font-medium text-gray-500">
                {title}
            </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {value}
            </dd>
        </div>
    );
};

export default TableRow;