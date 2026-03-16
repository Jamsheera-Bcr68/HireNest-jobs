type PaginationProps = {
  currentPage: number;
  totalPages: number;
  item: string;
  totalItem: number;
  count: number;
  onPageChange: (page: number) => void;
};

function Pagination({
  currentPage,
  totalPages,
  item,
  count,
  totalItem,
  onPageChange,
}: PaginationProps) {
  console.log('totalPages',totalPages);
  
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div>
      <span className="text-sm text-bold">
        Showing <span className="font-medium text-slate-700">{count}</span> of{' '}
        <span className="font-medium text-slate-700">{totalItem}</span> {item}
      </span>
      {totalPages > 1 && (
        <div className=" py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center  text-sm text-slate-500">
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 py-1.5 border bg-white border-slate-200 rounded-lg hover:bg-indigo-100 transition disabled:opacity-40"
            >
              ← Prev
            </button>
            {pages.map((page, ind) => (
              <button
                onClick={() => onPageChange(page)}
                key={ind}
                className={`px-3 py-1.5  rounded-lg font-medium ${page === currentPage ? 'bg-indigo-600 text-white' : 'bg-white text-slate'}`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg hover:bg-indigo1050 transition"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pagination;
