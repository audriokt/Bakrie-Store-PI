import React from "react";

const TopSelling = ({ products }) => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Top Selling Products</h2>
            <div className="space-y-4">
                {products.map((p) => (
                    <div
                        key={p.id_product}
                        className="flex gap-4 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition"
                    >
                        <img
                            src={p.image_url}
                            alt={p.product_name}
                            className="w-20 h-20 object-cover rounded-md"
                        />
                        <div>
                            <h3 className="font-semibold text-gray-800">{p.product_name}</h3>
                            <p className="text-sm text-gray-500">{p.description}</p>
                            <p className="text-sm text-red-600 font-bold">
                                Rp {p.product_price.toLocaleString("id-ID")}
                            </p>
                            <p className="text-xs text-gray-400">
                                Terjual: {p.totalSold} | Stok: {p.product_stock}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopSelling;