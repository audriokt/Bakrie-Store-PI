import React from "react";

const StatCard = ({ title, value, percentage, positive, icon: Icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition">
      <div className="w-10 h-10 flex items-center justify-center rounded-md bg-red-100 text-red-600">
        {Icon && <Icon className="w-5 h-5" />}
      </div>

      <div>
        <h4 className="text-xs text-gray-500">{title}</h4>
        <p className="text-lg font-bold text-gray-800">{value}</p>
        <span
          className={`text-xs font-medium ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {percentage}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
