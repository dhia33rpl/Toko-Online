"use client";

import { SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`;

      const payload = new FormData();
      payload.append("email", email);
      payload.append("password", password);

      const response = await fetch(url, {
        method: "POST",
        body: payload,
      });

      const responseData = await response.json();
      console.log(responseData);

      const message: string =
        typeof responseData?.message === "string"
          ? responseData.message
          : "Login success";

      const status: boolean = responseData?.status || false;

      if (!response.ok || !status) {
        toast.error(message || "Login Failed", {
          className: "bg-rose-500 text-white",
        });
        return;
      }

      toast.success(message || "Login Success", {
        className: "bg-green-500 text-white",
      });

      const role = responseData?.data?.role;

      if (role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    } catch (error) {
      console.log(error);

      toast.error("Login Failed", {
        className: "bg-rose-500 text-white",
      });
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FieldDescription>
                Enter your account password
              </FieldDescription>
            </Field>

            <Field>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </Field>

            <Field>
              <Button asChild variant="outline" className="w-full">
                <Link href="/signup">Create Account</Link>
              </Button>
            </Field>

            <FieldDescription className="text-center">
              Don&apos;t have an account? Create one first.
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}