import React from "react";

const LatestOrders = ({ todayOrders }) => {
  if (!Array.isArray(todayOrders) || todayOrders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-base font-semibold mb-3">Latest Orders</h2>
        <p className="text-gray-500 text-sm">No orders today.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-base font-semibold mb-3">Latest Orders</h2>

      <div className="space-y-2">
        {todayOrders.map((order) => (
          <div
            key={order.id}
            className="flex justify-between border-b pb-2 last:border-b-0"
          >
            <div>
              <p className="font-medium text-sm">{order.customer}</p>
              <p className="text-xs text-gray-500">{order.date}</p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-sm">
                Rp {Number(order.total).toLocaleString("id-ID")}
              </p>
              <span className="text-xs text-gray-600">{order.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestOrders;
