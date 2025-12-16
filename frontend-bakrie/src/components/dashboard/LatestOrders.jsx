import React from "react";

const LatestOrders = ({ todayOrders }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Latest Orders</h2>
            {todayOrders === 0 ? (
                <p className="text-gray-500">No orders today.</p>
            ) : (
                <p className="text-gray-700">Orders today: {todayOrders}</p>
            )}
        </div>
    );
};

export default LatestOrders;