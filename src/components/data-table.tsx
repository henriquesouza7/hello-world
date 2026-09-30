import type { ReactNode } from "react";

export interface DataColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  align?: "left" | "right";
}

export function DataTable<T extends { id: string }>({
  columns,
  rows,
  emptyMessage = "Nenhum registro encontrado.",
}: {
  columns: DataColumn<T>[];
  rows: T[];
  emptyMessage?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={\`px-5 py-3 font-medium \${column.align === "right" ? "text-right" : ""}\`}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-10 text-center text-sm text-slate-500">{emptyMessage}</td>
              </tr>
            ) : rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/70">
                {columns.map((column) => (
                  <td key={column.key} className={\`px-5 py-4 text-slate-700 \${column.align === "right" ? "text-right" : ""}\`}>
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
