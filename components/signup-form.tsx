"use client";

import { SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  // state form
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");

  async function handleRegister(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      // endpoint backend
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`;

      // payload form-data
      const payload = new FormData();
      payload.append("name", name);
      payload.append("email", email);
      payload.append("password", password);
      payload.append("role", role);

      // kirim request ke backend
      const response = await fetch(url, {
        method: "POST",
        body: payload,
      });

      const responseData = await response.json();

      const message: string =
        typeof responseData?.message === "string"
          ? responseData.message
          : Object.values(responseData?.message || {}).join(",");

      const status: boolean = responseData?.status || false;

      // kalau gagal
      if (!response.ok || !status) {
        toast.error(message || "Register Failed", {
          className: "bg-rose-500 text-white",
        });
        return;
      }

      // kalau berhasil
      toast.success(message || "Register Successfully", {
        className: "bg-green-500 text-white",
      });

      // redirect sesuai role
      if (role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    } catch (error) {
      console.log(error);

      toast.error("Register Failed", {
        className: "bg-rose-500 text-white",
      });
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleRegister}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Field>

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
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
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
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="role">Pilih Role</FieldLabel>
              <Select value={role} onValueChange={(value) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </Field>

            <Field>
              <Button variant="outline" type="button" className="w-full">
                Sign up with Google
              </Button>
            </Field>

            <FieldDescription className="px-6 text-center">
              Already have an account? <a href="#">Sign in</a>
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}