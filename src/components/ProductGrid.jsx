import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { memo } from "react";
import { Container } from './index'

const ProductGrid = memo(function ({ products }) {
    return (
        <div className="lg:col-span-3 overflow-auto">
            <div className="bg-white">
                <Container
                    backupElem={<h1 className="absolute translate-x-[-30%] capitalize left-1/2 text-4xl">no products found</h1>}
                    className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 "
                >
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </Container>
            </div>
        </div >
    )
})

function ProductCard({ product }) {
    return (
        <Link className="group relative border rounded p-2 duration-700" to={`/product-details/${product._id}`} >
            <div
                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80"

            >
                <img
                    src={product.thumbnail.url}
                    className="h-full w-full object-cover lg:h-full lg:w-full"
                    alt={product.product_name}
                />
            </div>
            <div className="mt-4 flex justify-between">
                <div>
                    <h3 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.product_name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 flex items-center">
                        <StarIcon className="h-6 w-6 text-yellow-500" /> {product.rating}
                    </p>
                </div>
                <div>
                    <p className="text-sm font-medium text-gray-900">
                        ₹{Math.round(product.price * (1 - product.discount * 0.01))}
                    </p>
                    {product.discount !== 0 && (
                        <p className={`text-sm ${product.discount !== 0 ? 'line-through' : ''} text-gray-400`}>
                            ${product.price}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default ProductGrid