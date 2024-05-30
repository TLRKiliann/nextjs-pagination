"use client";

export default function Pagination({ totalPages, paginate, currentPage }: 
    { 
        totalPages: number | undefined, 
        paginate: (pageNumber: number) => void, 
        currentPage: number 
    }) {

    // Display 4 pages (1,2,3,4)
    const pageNumbers = [];
    if (totalPages !== undefined) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    }

    return (
        <nav>
            <ul className="flex align-middle justify-center bg-slate-800 mx-4">
                {pageNumbers.map((pageNumber: number) => (
                    <li key={pageNumber} className={pageNumber === currentPage ? 'text-cyan-300' : 'text-white'}>
                        <button onClick={() => paginate(pageNumber)} 
                            className="text-2xl font-bold hover:text-slate-400 active:text-blue-500 p-4">
                            {pageNumber}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};