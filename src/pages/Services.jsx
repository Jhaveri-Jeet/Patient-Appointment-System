import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
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

import { Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createService, fetchServices, updateService } from "@/http/api";
import { SkeletonCard } from "@/components/skeletonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function Services() {
  useEffect(() => {
    document.title = "Services";
  }, []);

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

  const queryClient = useQueryClient();

  const [serviceId, setServiceId] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");

  const serviceNameRef = useRef(null);
  const serviceDescriptionRef = useRef(null);
  const servicePriceRef = useRef(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    staleTime: 10000,
  });

  const mutation = useMutation({
    mutationFn: ({ id, data }) => updateService(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["services"]);
      toast("Service Updated Successfully!", {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
    onError: () => {
      toast("Error while updating the service", {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const handleServiceInput = () => {
    if (serviceName && serviceDescription && servicePrice) {
      const data = {
        Name: serviceName,
        Description: serviceDescription,
        Price: servicePrice,
      };
      mutation.mutate({ id: serviceId, data });
    } else {
      toast("Error Occurred While Updating the service", {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    }
  };

  const createServicemutation = useMutation({
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

  const handleServiceCreateInput = () => {
    const name = serviceNameRef.current.value;
    const description = serviceDescriptionRef.current.value;
    const price = servicePriceRef.current.value;

    if (name && description && price) {
      const data = { Name: name, Description: description, Price: price };
      createServicemutation.mutate(data);
    }
  };

  if (isLoading) {
    return <SkeletonCard />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <main className="grid gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <Tabs defaultValue="all">
            <TabsContent value="all">
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                  <div className="justify-between flex">
                    <CardTitle>Services</CardTitle>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button>Add new Service</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Enter the details of the Service
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
                          <AlertDialogAction onClick={handleServiceCreateInput}>
                            Add Service
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <CardDescription>All of your services.</CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="grid gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {data.map((service) => (
              <Card
                key={service.Id}
                className="w-full"
                x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>{service.Name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">
                    {service.Description}
                  </p>
                </CardContent>
                <CardFooter className="justify-between relative">
                  <div className="text-2xl font-bold">💵{service.Price}</div>
                  <div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="absolute right-2 bottom-2"
                          onClick={() => {
                            setServiceId(service.Id);
                            setServiceName(service.Name);
                            setServiceDescription(service.Description);
                            setServicePrice(service.Price);
                          }}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Edit the Details of the Service
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            <Input
                              type="hidden"
                              value={serviceId}
                              onChange={(e) => setServiceId(e.target.value)}
                            />
                            <Input
                              type="text"
                              placeholder="Enter the Service Name:"
                              className="w-full rounded-lg bg-background my-6"
                              value={serviceName}
                              autoFocus={true}
                              onChange={(e) => setServiceName(e.target.value)}
                            />
                            <Input
                              type="text"
                              placeholder="Enter the Service Description:"
                              className="w-full rounded-lg bg-background my-6"
                              value={serviceDescription}
                              onChange={(e) =>
                                setServiceDescription(e.target.value)
                              }
                            />
                            <Input
                              type="number"
                              placeholder="Enter the Service Price:"
                              className="w-full rounded-lg bg-background my-6"
                              value={servicePrice}
                              onChange={(e) => setServicePrice(e.target.value)}
                            />
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleServiceInput}>
                            Update
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
