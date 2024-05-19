import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  ListFilter,
  MoreVertical,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchTodaysAppointments,
  fetchTotalPatients,
  fetchTotalPendingAppointmentCount,
} from "@/http/api";
import { SkeletonTable } from "@/components/skeletonTable";
import { SkeletonCard } from "@/components/skeletonCard";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const {
    data: todaysAppointments,
    isLoading: isLoadingAppointments,
    isError: isErrorAppointments,
    error: errorAppointments,
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
    error: errorTotalPatients,
  } = useQuery({
    queryKey: ["totalPatients"],
    queryFn: fetchTotalPatients,
    staleTime: 10000,
  });
  if (isLoadingAppointments) {
    return <SkeletonTable />;
  }

  if (isLoadingTotalPendingCount) {
    return <SkeletonCard />;
  }

  if (isLoadingTotalPatients) {
    return <SkeletonCard />;
  }

  if (isErrorTotalPendingCount) {
    return <div>Error: {errorTotalPendingCount.message}</div>;
  }

  if (isErrorAppointments) {
    return <div>Error: {errorAppointments.message}</div>;
  }
  if (isErrorTotalPatient) {
    return <div>Error: {errorTotalPatients.message}</div>;
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
              <Button>Create New Service</Button>
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
                <CardTitle>Appointments</CardTitle>
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
                Order Oe31b70H
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>Date: November 23, 2023</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <div className="grid gap-3">
              <div className="font-semibold">Order Details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Glimmer Lamps x <span>2</span>
                  </span>
                  <span>$250.00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Aqua Filters x <span>1</span>
                  </span>
                  <span>$49.00</span>
                </li>
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>$299.00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>$5.00</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>$25.00</span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>$329.00</span>
                </li>
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-3">
                <div className="font-semibold">Shipping Information</div>
                <address className="grid gap-0.5 not-italic text-muted-foreground">
                  <span>Liam Johnson</span>
                  <span>1234 Main St.</span>
                  <span>Anytown, CA 12345</span>
                </address>
              </div>
              <div className="grid auto-rows-max gap-3">
                <div className="font-semibold">Billing Information</div>
                <div className="text-muted-foreground">
                  Same as shipping address
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Doctor Information</div>
              <dl className="grid gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Doctor</dt>
                  <dd>Liam Johnson</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Email</dt>
                  <dd>
                    <a to="mailto:">liam@acme.com</a>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Phone</dt>
                  <dd>
                    <a to="tel:">+1 234 567 890</a>
                  </dd>
                </div>
              </dl>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
