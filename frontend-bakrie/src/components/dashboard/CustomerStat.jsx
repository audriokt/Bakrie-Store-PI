import React from "react";

const CustomerStats = ({ customers }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border">
      <p className="text-xs text-gray-500">Total Customers</p>
      <p className="text-xl font-bold text-red-600">
        {customers.length}
      </p>
    </div>
  );
};

export default CustomerStats;
