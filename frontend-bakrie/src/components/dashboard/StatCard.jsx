import React from "react";

const StatCard = ({ title, value, percentage, positive, icon: Icon }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-red-100 text-red-600">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h4 className="text-sm text-gray-500">{title}</h4>
                <p className="text-xl font-bold text-gray-800">{value}</p>
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