import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { fetchPatients } from "@/http/api";
import { useQuery } from "@tanstack/react-query";

export default function Patients() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
    staleTime: 10000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main className="grid flex gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Tabs defaultValue="all">
          <TabsContent value="all">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Patients</CardTitle>
                <CardDescription>All of your patients.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Mobile Number
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Email
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Gender
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Address
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((patients, index) => (
                      <TableRow className="bg-accent" key={index}>
                        <TableCell>
                          <div className="font-medium">{patients.Name}</div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {patients.Mobile}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {patients.Email}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {patients.Address}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {patients.Mobile}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
