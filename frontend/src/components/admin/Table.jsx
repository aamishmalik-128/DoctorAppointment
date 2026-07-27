import React from "react";

const Table = ({ headers = [], children, emptyMessage = "No data records available." }) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-teal-100/90 bg-white/95 shadow-sm backdrop-blur-md">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                    <thead>
                        <tr className="bg-teal-50/60 text-teal-900 font-extrabold uppercase text-[11px] tracking-wider border-b border-teal-100">
                            {headers.map((header, index) => (
                                <th key={index} className="p-3.5 px-4">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-teal-100/60 text-slate-700 font-medium">
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
