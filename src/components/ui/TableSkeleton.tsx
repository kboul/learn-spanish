export function TableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2">
              <div className="animate-pulse">
                <div className="bg-gray-200 h-4 w-24 rounded"></div>
              </div>
            </th>
            <th className="px-4 py-2">
              <div className="animate-pulse">
                <div className="bg-gray-200 h-4 w-24 rounded"></div>
              </div>
            </th>
            <th className="px-4 py-2">
              <div className="animate-pulse">
                <div className="bg-gray-200 h-4 w-24 rounded"></div>
              </div>
            </th>
            <th className="px-4 py-2">
              <div className="animate-pulse">
                <div className="bg-gray-200 h-4 w-24 rounded"></div>
              </div>
            </th>
            <th className="px-4 py-2">
              <div className="animate-pulse">
                <div className="bg-gray-200 h-4 w-24 rounded"></div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 14 }).map((_, index) => (
            <tr>
              {Array.from({ length: 5 }).map((_, index) => (
                <td className="px-4 py-2">
                  <div className="animate-pulse">
                    <div className="bg-gray-200 h-4 w-24 rounded"></div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
