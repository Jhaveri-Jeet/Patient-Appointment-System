import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Copy } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { fetchAppointmentAccToPatients, fetchPatientsById } from "@/http/api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useLocation } from "react-router-dom";
import { SkeletonTable } from "@/components/skeletonTable";
import { Separator } from "@/components/ui/separator";
import { SkeletonCard } from "@/components/skeletonCard";

export default function PatientAppointments() {
  useEffect(() => {
    document.title = "Patient Appointment";
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const patientId = location.state?.patientId;

  if (
    patientId === 0 ||
    patientId === null ||
    patientId === "" ||
    patientId === undefined
  ) {
    navigate("/Patients");
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => fetchAppointmentAccToPatients(patientId),
  });

  const {
    data: patientData,
    isLoading: isLoadingPatientData,
    isError: isErrorPatientData,
    error: errorPatientData,
  } = useQuery({
    queryKey: ["patient"],
    queryFn: () => fetchPatientsById(patientId),
  });

  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  let index = 1;
  const columns = useMemo(
    () => [
      {
        accessorKey: "Problem",
        header: "Problem",
      },
      {
        accessorKey: "Date",
        header: "Date",
      },
      {
        accessorKey: "Prescription",
        header: "Prescription",
      },
      {
        accessorKey: "service.Name",
        header: "Service",
      },
      {
        accessorKey: "slot.Time",
        header: "Time",
      },
      {
        accessorKey: "Status",
        header: "Status",
      },
    ],
    []
  );

  const table = useReactTable({
    data: data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isLoading) {
    return <SkeletonTable />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isLoadingPatientData) {
    return <SkeletonCard />;
  }

  if (isErrorPatientData) {
    return <div>Error: {errorPatientData.message}</div>;
  }

  return (
    <main className="grid flex gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <Tabs defaultValue="all">
          <TabsContent value="all">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Patient Appointments</CardTitle>
                <CardDescription>
                  All of your patient appointments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full">
                  <div className="flex items-center py-4">
                    <Input
                      placeholder="Search by problem..."
                      onChange={(event) =>
                        table
                          .getColumn("Problem")
                          ?.setFilterValue(event.target.value)
                      }
                      className="max-w-sm"
                      autoFocus={true}
                      tabIndex={1}
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                          Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {table
                          .getAllColumns()
                          .filter((column) => column.getCanHide())
                          .map((column) => {
                            return (
                              <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) =>
                                  column.toggleVisibility(!!value)
                                }
                              >
                                {column.id}
                              </DropdownMenuCheckboxItem>
                            );
                          })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                          <TableRow key={headerGroup.id}>
                            <TableHead>Sr</TableHead>
                            {headerGroup.headers.map((header) => {
                              return (
                                <TableHead key={header.id}>
                                  {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                      )}
                                </TableHead>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableHeader>
                      <TableBody>
                        {table.getRowModel().rows?.length ? (
                          table.getRowModel().rows.map((row) => (
                            <TableRow
                              key={row.id}
                              data-state={row.getIsSelected() && "selected"}
                            >
                              <TableCell>{index++}</TableCell>
                              {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={columns.length}
                              className="h-24 text-center"
                            >
                              No results.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                      {table.getFilteredSelectedRowModel().rows.length} of{" "}
                      {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div>
        <Card className="overflow-hidden mt-2.5" x-chunk="dashboard-05-chunk-4">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                {patientData.Name}
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>{patientData.Email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">Patient Details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span>{patientData.Name}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Address</span>
                  <span>{patientData.Address}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Gender</span>
                  <span>{patientData.Gender}</span>
                </li>
              </ul>
              <Separator className="my-2" />
              <div className="font-semibold">Contact Details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Mobile</span>
                  <span>{patientData.Mobile}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span>{patientData.Email}</span>
                </li>
              </ul>
              <Separator className="my-2" />
              <div className="font-semibold">Health Details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Blood Group</span>
                  <span>{patientData.BloodGroup}</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
