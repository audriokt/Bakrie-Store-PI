import React from "react";

const CustomerStats = ({ customers }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Customer Stats</h2>
            <p className="text-gray-700">Total Customers: {customers}</p>
        </div>
    );
};

export default CustomerStats;
