import {
  Card,
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

import { Pencil } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createSlot, fetchSlots, updateSlot } from "@/http/api";
import { SkeletonCard } from "@/components/skeletonCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent } from "@/components/ui/tabs";

export default function Slots() {
  useEffect(() => {
    document.title = "Slots";
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
  const [slotId, setSlotId] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const timeRef = useRef();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["slots"],
    queryFn: fetchSlots,
    staleTime: 10000,
  });

  const mutation = useMutation({
    mutationFn: ({ id, data }) => updateSlot(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["slots"]);
      toast("Slot Updated Successfully!", {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
    onError: () => {
      toast("Error while updating the slot", {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const handleSlotInput = () => {
    if (slotTime) {
      const data = {
        Time: slotTime,
      };
      mutation.mutate({ id: slotId, data });
    } else {
      toast("Error Occurred While Updating the slot", {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    }
  };

  const createSlotMutation = useMutation({
    mutationFn: (data) => createSlot(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["slots"]);
      toast("Slot Created Successfully!", {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const handleSlotCreateInput = () => {
    const time = timeRef.current.value;
    if (time) {
      const data = {
        Time: time,
      };
      createSlotMutation.mutate(data);
    } else {
      toast("Error Occurred While adding the slot", {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
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
                    <CardTitle>Slots</CardTitle>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button>Add new Slot</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Enter the Time of the Slot
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            <Input
                              ref={timeRef}
                              type="text"
                              placeholder="Enter the Time:"
                              className="w-full rounded-lg bg-background my-6"
                              autoFocus={true}
                            />
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleSlotCreateInput}>
                            Add Slot
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <CardDescription>All of your slots.</CardDescription>
                </CardHeader>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className="grid gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {data.map((slot) => (
              <Card
                key={slot.Id}
                className="w-full"
                x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>{slot.Time}</CardTitle>
                </CardHeader>
                <CardFooter className="justify-between relative">
                  <div>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant={"outline"}
                          className="absolute right-2 bottom-2"
                          onClick={() => {
                            setSlotId(slot.Id);
                            setSlotTime(slot.Time);
                          }}
                        >
                          <Pencil className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Edit the Details of the Slot
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            <Input
                              type="hidden"
                              value={slotId}
                              onChange={(e) => setSlotId(e.target.value)}
                            />
                            <Input
                              type="text"
                              placeholder="Enter the Service Name:"
                              className="w-full rounded-lg bg-background my-6"
                              value={slotTime}
                              autoFocus={true}
                              onChange={(e) => setSlotTime(e.target.value)}
                            />
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleSlotInput}>
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
