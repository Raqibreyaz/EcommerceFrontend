import { memo } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid"

const Pagination = memo(function ({ PageChanger, page = 1, limit = 10, totalPages = 1, filteredTotal = 0 }) {

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <button
                    onClick={() => PageChanger(page - 1)}
                    disabled={page === 1}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => PageChanger(page + 1)}
                    disabled={page === totalPages}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing
                        <span className="font-medium mx-1">{Math.min(1, filteredTotal)}</span>
                        to
                        <span className="font-medium mx-1">{Math.min(filteredTotal, limit)}</span>
                        of{' '}
                        <span className="font-medium mx-1">{filteredTotal}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            disabled={page == 1}
                            onClick={() => PageChanger(page - 1)}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <PageNumberCompo totalPages={totalPages} page={page} PageChanger={PageChanger} />
                        <button
                            onClick={() => PageChanger(page + 1)}
                            disabled={page === totalPages}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
})

function PageNumberCompo({ totalPages, page, PageChanger }) {

    const PageNumbers = []

    const PageNumber = (index, currentPage = page) => (
        currentPage === index ? <button
            type="button"
            key={index}
            aria-current="page"
            className={`relative z-10 inline-flex items-center bg-indigo-600  px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
        >
            {index}
        </button> :
            <button
                type="button"
                key={index}
                onClick={() => PageChanger(index)}
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
                {index}
            </button>
    )

    if (totalPages - 6 > page) {
        // taking the first 3
        for (let index = page; index <= page + 2; index++) {
            // PageNumbers.push(PageNumber(index))
            PageNumbers.push(PageNumber(index))
        }

        // pushing the ellipsis
        PageNumbers.push(
            <span key={Date.now()} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
            </span>
        )

        // taking the last 3
        for (let index = totalPages - 2; index <= totalPages; index++) {
            PageNumbers.push(PageNumber(index))
        }
    }
    else if (totalPages - 4 > page) {

        // taking the first 2 
        for (let index = page; index <= page + 1; index++) {
            PageNumbers.push(PageNumber(index))
        }

        // pushing the ellipsis
        PageNumbers.push(
            <span key={Date.now()} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
            </span>
        )

        // taking the last 2
        for (let index = totalPages - 1; index <= totalPages; index++) {
            PageNumbers.push(PageNumber(index))
        }
    }
    else {
        for (let index = page; index <= totalPages; index++) {
            PageNumbers.push(PageNumber(index))
        }
    }

    return PageNumbers;
}

export default Pagination

