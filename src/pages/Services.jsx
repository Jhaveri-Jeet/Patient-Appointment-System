import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchServices } from "@/http/api";
import { SkeletonCard } from "@/components/skeletonCard";

export default function Services() {
  useEffect(() => {
    document.title = "Services";
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    staleTime: 10000,
  });

  if (isLoading) {
    return <SkeletonCard />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <main className="grid gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
      <div className="grid gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {data.map((services) => (
            <Card
              key={services.Id}
              className="w-full"
              x-chunk="dashboard-05-chunk-0"
            >
              <CardHeader className="pb-3">
                <CardTitle>{services.Name}</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  {services.Description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <CardTitle className="text-3xl">₹ {services.Price}</CardTitle>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
