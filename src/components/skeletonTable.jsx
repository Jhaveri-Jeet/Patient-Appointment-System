import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y">
        <thead>
          <tr>
            <th scope="col">
              <Skeleton className="h-4 w-24" />
            </th>
            <th scope="col">
              <Skeleton className="h-4 w-32" />
            </th>
            <th scope="col">
              <Skeleton className="h-4 w-28" />
            </th>
            <th scope="col">
              <Skeleton className="h-4 w-20" />
            </th>
            <th scope="col">
              <Skeleton className="h-4 w-36" />
            </th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {[...Array(10)].map((_, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-4 w-12" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-4 w-24" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-4 w-20" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-4 w-28" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
