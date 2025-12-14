import React from 'react'
import ItemsCard from '../../components/layout/itemsCard/ItemsCard'
import { useProduct } from '../../hooks/useProduct.js'
import Loading from "../../components/loader/Loading"

const ProductPage = () => {
    const { products, loading, currentPage, totalPages, fetchDataProduct } = useProduct()

    return (
        <div className="min-h-[800px] pt-40 px-10 mb-20"> {/* tambahkan mb-20 untuk jarak dengan footer */}
            <h1 className='text-5xl text-yes font-extrabold'>Our Products</h1>
            <h1 className='mt-4 text-yes'>All the goods flavours for you to try!</h1>
            <hr className="h-[2px] my-8 bg-ookay border-0"/>

            {loading ? (
                <Loading />
            ) : products && products.length > 0 ? (
                <>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                        {products.map((product) => (
                            <ItemsCard key={product.id} product={product} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-10 space-x-2">
                        <button
                            disabled={currentPage === 0}
                            onClick={() => fetchDataProduct(currentPage - 1)}
                            className={`px-4 py-2 rounded-full border font-medium transition duration-300 ${
                                currentPage === 0
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-yes text-white border-yes hover:bg-transparent hover:text-yes'
                            }`}
                        >
                            Prev
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => fetchDataProduct(i)}
                                className={`px-4 py-2 rounded-full border font-medium transition duration-300 ${
                                    currentPage === i
                                        ? 'bg-yes text-white border-yes'
                                        : 'bg-transparent text-yes border-yes hover:bg-yes hover:text-white'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === totalPages - 1}
                            onClick={() => fetchDataProduct(currentPage + 1)}
                            className={`px-4 py-2 rounded-full border font-medium transition duration-300 ${
                                currentPage === totalPages - 1
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-yes text-white border-yes hover:bg-transparent hover:text-yes'
                            }`}
                        >
                            Next
                        </button>

                        <button
                            onClick={() => fetchDataProduct(0)}
                            className="px-4 py-2 rounded-full border border-yes bg-transparent text-yes hover:bg-yes hover:text-white font-medium transition duration-300"
                        >
                            First Page
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center bg-[#FFF5F5] border-2 border-dashed border-[#FFDADA] rounded-3xl shadow-lg max-w-2xl mx-auto py-20 px-10 text-center">
                    <img src="/waiting/waiting.svg" alt="No products" className='w-32 mb-6' />
                    <h2 className="text-2xl font-bold text-red-600 mb-3">
                        There's no product right now
                    </h2>
                    <p className="text-gray-500">
                        Please check back later or explore our store right away!
                    </p>
                </div>
            )}
        </div>
    )
}

export default ProductPage