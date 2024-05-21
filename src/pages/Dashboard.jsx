import { Copy, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createService,
  fetchAdminDetails,
  fetchServices,
  fetchTodaysAppointments,
  fetchTotalPatients,
  fetchTotalPendingAppointmentCount,
  updateAdminDetails, // Import the update function
} from "@/http/api";

import { SkeletonCard } from "@/components/skeletonCard";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const queryClient = useQueryClient();
  const serviceNameRef = useRef(null);
  const serviceDescriptionRef = useRef(null);
  const servicePriceRef = useRef(null);

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

  const [adminFormData, setAdminFormData] = useState({
    Username: "",
    HashPassword: "admin",
    FullName: "",
    Email: "",
    Address: "",
    Degree: "",
  });

  const {
    data: todaysAppointments,
    isLoading: isLoadingAppointments,
    isError: isErrorAppointments,
  } = useQuery({
    queryKey: ["todaysAppointment"],
    queryFn: fetchTodaysAppointments,
    staleTime: 10000,
  });

  const {
    data: totalPendingCountData,
    isLoading: isLoadingTotalPendingCount,
    isError: isErrorTotalPendingCount,
    error: errorTotalPendingCount,
  } = useQuery({
    queryKey: ["totalPendingCount"],
    queryFn: fetchTotalPendingAppointmentCount,
    staleTime: 10000,
  });

  const {
    data: totalPatientsData,
    isLoading: isLoadingTotalPatients,
    isError: isErrorTotalPatient,
  } = useQuery({
    queryKey: ["totalPatients"],
    queryFn: fetchTotalPatients,
    staleTime: 10000,
  });

  const { data: adminDetails } = useQuery({
    queryKey: ["adminDetails"],
    queryFn: fetchAdminDetails,
    staleTime: 10000,
  });

  useEffect(() => {
    if (adminDetails) {
      setAdminFormData({
        Username: adminDetails.Username || "",
        HashPassword: adminDetails.HashPassword || "",
        FullName: adminDetails.FullName || "",
        Email: adminDetails.Email || "",
        Address: adminDetails.Address || "",
        Degree: adminDetails.Degree || "",
      });
    }
  }, [adminDetails]);

  const { data: serviceDetails } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    staleTime: 10000,
  });

  const mutation = useMutation({
    mutationFn: (data) => createService(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]);
      toast("Service Created Successfully !", {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
    onError: () => {
      toast("Error Occurred While Creating the service", {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const handleServiceInput = () => {
    const name = serviceNameRef.current.value;
    const description = serviceDescriptionRef.current.value;
    const price = servicePriceRef.current.value;

    if (name && description && price) {
      const data = { Name: name, Description: description, Price: price };
      mutation.mutate(data);
    }
  };

  const updateMutation = useMutation({
    mutationFn: (data) => updateAdminDetails(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["adminDetails"]);
      toast("Admin Details Updated Successfully!", {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
    onError: () => {
      toast("Error Occurred While Updating Admin Details", {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const handleAdminDetailUpdate = () => {
    updateMutation.mutate(adminFormData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (
    isLoadingTotalPendingCount ||
    isLoadingTotalPatients ||
    isLoadingAppointments
  ) {
    return <SkeletonCard />;
  }

  if (isErrorTotalPendingCount || isErrorAppointments || isErrorTotalPatient) {
    return <div>Error: {errorTotalPendingCount.message}</div>;
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Your Services</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Introducing Our Dynamic Service Dashboard for Seamless
                Management and Insightful Analysis.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Create new Service</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Enter the Details of the Service
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <Input
                        ref={serviceNameRef}
                        type="text"
                        placeholder="Enter the Service Name:"
                        className="w-full rounded-lg bg-background my-6"
                        autoFocus={true}
                      />
                      <Input
                        ref={serviceDescriptionRef}
                        type="text"
                        placeholder="Enter the Service Description:"
                        className="w-full rounded-lg bg-background my-6"
                      />
                      <Input
                        ref={servicePriceRef}
                        type="number"
                        placeholder="Enter the Service Price:"
                        className="w-full rounded-lg bg-background my-6"
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleServiceInput}>
                      Create
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-1">
            <CardHeader className="pb-2">
              <CardDescription>Total Patients</CardDescription>
              <CardTitle className="text-4xl">{totalPatientsData}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Your total patients count.
              </div>
            </CardContent>
            <CardFooter>
              <Progress value={totalPatientsData} aria-label="25% increase" />
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-05-chunk-2">
            <CardHeader className="pb-2">
              <CardDescription>Pending Appointments</CardDescription>
              <CardTitle className="text-4xl">
                {totalPendingCountData}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                Your pending appointments.
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={totalPendingCountData}
                aria-label="12% increase"
              />
            </CardFooter>
          </Card>
        </div>
        <Tabs defaultValue="week">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="week">Today</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="week">
            <Card x-chunk="dashboard-05-chunk-3">
              <CardHeader className="px-7">
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>
                  All of your pending appointments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Problem
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Service
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Time
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todaysAppointments.map((todaysAppointments, index) => (
                      <TableRow key={index}>
                        <TableCell className="hidden sm:table-cell">
                          {todaysAppointments.patient.Name}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {todaysAppointments.Problem}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {new Date(todaysAppointments.Date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {todaysAppointments.service.Name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {todaysAppointments.slot.Time}
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
      <div>
        <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                {adminDetails?.FullName}
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>{adminDetails?.Email}</CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={"outline"}>
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Edit the Details of the Doctor
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      <Input
                        type="text"
                        placeholder="Enter Username"
                        className="w-full rounded-lg bg-background my-6"
                        autoFocus={true}
                        name="Username"
                        value={adminFormData.Username}
                        onChange={handleInputChange}
                      />
                      <Input
                        type="password"
                        placeholder="Enter Password"
                        className="w-full rounded-lg bg-background my-6"
                        name="HashPassword"
                        value={adminFormData.HashPassword}
                        onChange={handleInputChange}
                      />
                      <Input
                        type="text"
                        placeholder="Enter Full Name"
                        className="w-full rounded-lg bg-background my-6"
                        name="FullName"
                        value={adminFormData.FullName}
                        onChange={handleInputChange}
                      />
                      <Input
                        type="email"
                        placeholder="Enter Email"
                        className="w-full rounded-lg bg-background my-6"
                        name="Email"
                        value={adminFormData.Email}
                        onChange={handleInputChange}
                      />
                      <Input
                        type="text"
                        placeholder="Enter Address"
                        className="w-full rounded-lg bg-background my-6"
                        name="Address"
                        value={adminFormData.Address}
                        onChange={handleInputChange}
                      />
                      <Input
                        type="text"
                        placeholder="Enter Degree"
                        className="w-full rounded-lg bg-background my-6"
                        name="Degree"
                        value={adminFormData.Degree}
                        onChange={handleInputChange}
                      />
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleAdminDetailUpdate}>
                      Update
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">Service Details</div>
              <ul className="grid gap-3">
                {serviceDetails.map((serviceDetail, index) => (
                  <li className="flex items-center justify-between" key={index}>
                    <span className="text-muted-foreground">
                      {serviceDetail.Name}
                    </span>
                    <span>₹ {serviceDetail.Price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <div className="font-semibold">Address</div>
                <address className="grid gap-0.5 not-italic text-muted-foreground">
                  <span>{adminDetails?.Address}</span>
                </address>
              </div>
              <div className="grid auto-rows-max gap-3">
                <div className="font-semibold">Degree</div>
                <div className="text-muted-foreground">
                  {adminDetails?.Degree}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
