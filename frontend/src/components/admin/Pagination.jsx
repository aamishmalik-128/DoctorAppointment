import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between border-t border-teal-100/80 pt-4 px-2 text-xs">
            <p className="text-slate-500 font-medium">
                Page <span className="font-bold text-slate-800">{currentPage}</span> of{" "}
                <span className="font-bold text-slate-800">{totalPages}</span>
            </p>

            <div className="flex items-center gap-1.5">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-teal-100 bg-white text-slate-700 font-semibold hover:bg-teal-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-xs"
                >
                    <ChevronLeft size={14} /> Previous
                </button>

                <div className="hidden sm:flex items-center gap-1 px-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => onPageChange(pageNum)}
                            className={`h-8 w-8 rounded-xl font-bold transition cursor-pointer text-xs ${
                                currentPage === pageNum
                                    ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-xs"
                                    : "bg-white text-slate-600 border border-teal-100 hover:bg-teal-50"
                            }`}
                        >
                            {pageNum}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-teal-100 bg-white text-slate-700 font-semibold hover:bg-teal-50 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer shadow-xs"
                >
                    Next <ChevronRight size={14} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
