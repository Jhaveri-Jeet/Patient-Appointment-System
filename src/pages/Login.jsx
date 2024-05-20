import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { autheticationAdmin } from "@/http/api";
import { toast } from "sonner";
import useStoreToken from "@/http/store";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login() {
  const token = useStoreToken((state) => state.token);

  if (token) {
    return <Navigate to="/Dashboard" replace />;
  }
  useEffect(() => {
    document.title = "Login";
  }, []);

  const navigate = useNavigate();
  const setAccessToken = useStoreToken((state) => state.setToken);
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

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const mutation = useMutation({
    mutationFn: (data) => autheticationAdmin(data),
    onSuccess: (response) => {
      console.log(response.data.access_token);
      setAccessToken(response.data.access_token);
      toast("LoggedIn Successfully!", {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
      navigate("/Dashboard");
    },
    onError: (error) => {
      console.log(error);
      toast("Error while processing", {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => console.log("Ok"),
        },
      });
    },
  });

  const handleLoginSubmit = () => {
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (username && password) {
      const data = {
        Username: username,
        HashPassword: password,
      };

      mutation.mutate(data);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              ref={usernameRef}
              type="text"
              placeholder="Enter the Username"
              required
              autoFocus
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              ref={passwordRef}
              type="password"
              placeholder="Enter the Password"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleLoginSubmit}
            disabled={mutation.isPending}
          >
            Sign in
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
    </section>
  );
}
