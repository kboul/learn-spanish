type TableProps<T> = {
  data?: T[];
  errorMsg?: string;
  headers: string[];
  noItemsMsg?: string;
  renderRow: (item: T) => React.ReactNode;
};

const TrWithColSpan = ({ colSpan, children }: { colSpan: number; children: React.ReactNode }) => (
  <tr className="bg-white border-b border-gray-200">
    <td className="px-6 py-3 text-center" colSpan={colSpan}>
      {children}
    </td>
  </tr>
);

export default function Table<T>({ data, errorMsg = "", headers, noItemsMsg = "", renderRow }: TableProps<T>) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th scope="col" className="px-6 py-3" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map(renderRow)}
          {data?.length === 0 && <TrWithColSpan colSpan={headers.length}>{noItemsMsg}</TrWithColSpan>}
          {errorMsg && <TrWithColSpan colSpan={headers.length}>{errorMsg}</TrWithColSpan>}
        </tbody>
      </table>
    </div>
  );
}
