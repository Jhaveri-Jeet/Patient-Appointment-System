import React, { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ChevronDown, Copy } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { SkeletonCard } from "@/components/skeletonCard";
import { fetchPatients, createPatient } from "@/http/api";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";

export default function Patients() {
  const [patientId, setPatientId] = useState(1);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const numberRef = useRef(null);
  const addressRef = useRef(null);
  const genderRef = useRef(null);
  const bloodGroupRef = useRef(null);

  useEffect(() => {
    document.title = "Patients";
  }, []);

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const [patientCard, setPatientCard] = useState(false);
  const [patientSendId, setPatientSendId] = useState(false);
  const [patientName, setPatientName] = useState(null);
  const [patientEmail, setPatientEmail] = useState(null);
  const [patientNumber, setPatientNumber] = useState(null);
  const [patientAddress, setPatientAddress] = useState(null);
  const [patientGender, setPatientGender] = useState(null);
  const [patientBloodGroup, setPatientBloodGroup] = useState(null);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["patients"],
    queryFn: fetchPatients,
    staleTime: 10000,
  });

  const patientMutation = useMutation({
    mutationFn: (data) => createPatient(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["patients"]);
      toast("Patient Added Successfully!", {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
    onError: () => {
      toast("Error while adding the patient", {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const handlePatientInput = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const number = numberRef.current.value;
    const address = addressRef.current.value;
    const gender = genderRef.current.value;
    const bloodGroup = bloodGroupRef.current.value;

    if (name && email && number && address && gender && bloodGroup) {
      const data = {
        Name: name,
        Mobile: number,
        Email: email,
        Address: address,
        Gender: gender,
        BloodGroup: bloodGroup,
      };
      patientMutation.mutate(data);
    } else {
      toast("Error Occurred While adding the patient", {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    }
  };

  const viewPatient = (patient) => {
    console.log(patient);
    setPatientCard(true);
    setPatientSendId(patient.Id);
    setPatientName(patient.Name);
    setPatientEmail(patient.Email);
    setPatientNumber(patient.Mobile);
    setPatientAddress(patient.Address);
    setPatientGender(patient.Gender);
    setPatientBloodGroup(patient.BloodGroup);
  };
  const columns = useMemo(
    () => [
      {
        accessorKey: "Name",
        header: "Name",
      },
      {
        accessorKey: "Mobile",
        header: "Mobile",
      },
      {
        accessorKey: "Email",
        header: "Email",
      },
      {
        accessorKey: "Gender",
        header: "Gender",
      },
    ],
    []
  );

  const viewAppointments = (id) => {
    navigate("/PatientAppointments", { state: { patientId: id } });
  };

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

  let index = 1;

  if (isLoading) {
    return <SkeletonCard />;
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
                <div className="justify-between flex">
                  <CardTitle>Patients</CardTitle>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button>Add new Patient</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Enter the Details of the Patient
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          <Input
                            ref={nameRef}
                            type="text"
                            placeholder="Enter the Name:"
                            className="w-full rounded-lg bg-background my-6"
                            autoFocus={true}
                          />
                          <Input
                            ref={emailRef}
                            type="email"
                            placeholder="Enter the Email:"
                            className="w-full rounded-lg bg-background my-6"
                          />
                          <Input
                            ref={numberRef}
                            type="text"
                            placeholder="Enter the Number:"
                            className="w-full rounded-lg bg-background my-6"
                          />
                          <Input
                            ref={addressRef}
                            type="text"
                            placeholder="Enter the Address:"
                            className="w-full rounded-lg bg-background my-6"
                          />
                          <Input
                            ref={genderRef}
                            type="text"
                            placeholder="Enter the Gender:"
                            className="w-full rounded-lg bg-background my-6"
                          />
                          <Input
                            ref={bloodGroupRef}
                            type="text"
                            placeholder="Enter the Blood Group:"
                            className="w-full rounded-lg bg-background my-6"
                          />
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handlePatientInput}>
                          Add Patient
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <CardDescription>All of your patients.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full">
                  <div className="flex items-center py-4">
                    <Input
                      placeholder="Search by names..."
                      onChange={(event) =>
                        table
                          .getColumn("Name")
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
                        {data && table.getRowModel().rows?.length ? (
                          table.getRowModel().rows.map((row) => (
                            <TableRow
                              key={row.id}
                              data-state={row.getIsSelected() && "selected"}
                              onClick={() => viewPatient(row.original)}
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
      <div className={patientCard ? "" : "hidden"}>
        <Card className="overflow-hidden mt-2.5" x-chunk="dashboard-05-chunk-4">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                {patientName}
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>{patientEmail}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">Patient Details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span>{patientName}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Address</span>
                  <span>{patientAddress}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Gender</span>
                  <span>{patientGender}</span>
                </li>
              </ul>
              <Separator className="my-2" />
              <div className="font-semibold">Contact Details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Mobile</span>
                  <span>{patientNumber}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span>{patientEmail}</span>
                </li>
              </ul>
              <Separator className="my-2" />
              <div className="font-semibold">Health Details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Blood Group</span>
                  <span>{patientBloodGroup}</span>
                </li>
              </ul>
              <div className="justify-between flex">
                <Button
                  className="mt-5 ml-auto"
                  onClick={() => viewAppointments(patientSendId)}
                >
                  View Appointments
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
