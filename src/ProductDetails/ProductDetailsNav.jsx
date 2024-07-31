import React from 'react'

function ProductDetailsNav({ name }) {
    return (
        <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                {
                    [
                        { id: 1, name: 'Women' },
                        { id: 2, name: 'Clothing' },
                    ].map((breadcrumb) => (
                        <li key={breadcrumb.id}>
                            <div className="flex items-center">
                                <span className="mr-1 text-sm font-medium text-gray-900 max-sm:text-xs">
                                    {breadcrumb.name}
                                </span>
                                <svg
                                    width={16}
                                    height={20}
                                    viewBox="0 0 16 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                    className="h-5 w-4 text-gray-300"
                                >
                                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                </svg>
                            </div>
                        </li>
                    ))}
                <li className="text-sm max-sm:text-xs">
                    <span aria-current="page" className=" text-gray-500 hover:text-gray-600 capitalize font-semibold">
                        {name}
                    </span>
                </li>
            </ol>
        </nav>
    )
}

export default React.memo(ProductDetailsNav)
