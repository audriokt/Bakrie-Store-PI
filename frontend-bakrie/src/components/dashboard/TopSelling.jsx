import React from "react";

const TopSelling = ({ products }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h2 className="text-base font-semibold mb-3">Top Selling Products</h2>
        <p className="text-gray-500 text-sm">No data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-base font-semibold mb-3">Top Selling Products</h2>

      <div className="space-y-2">
        {products.map((p, index) => (
          <div
            key={p.id ?? index}
            className="flex gap-3 bg-gray-50 rounded-md p-3"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-sm text-gray-800">
                {p.product_name || "Unnamed Product"}
              </h3>
              <p className="text-xs text-gray-400">
                Terjual: {Number(p.totalSold ?? 0)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSelling;
