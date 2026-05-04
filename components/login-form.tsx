"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { SubmitEvent, useState } from "react"
import { toast } from "sonner"
import { parseResponseMessage, setCookie } from "@/lib/helper"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const router = useRouter()

  async function handleLogin(event: SubmitEvent<HTMLFormElement>){
    event.preventDefault()

    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`

      const requestData = new FormData()
      requestData.append("email", email)
      requestData.append("password", password)
      const response = await fetch(url,{
        method: "POST",
        body: requestData
      })

      // mengubah response dari backend
      const responseData = await response.json()
      const message = await parseResponseMessage(responseData?.message)
      if(!response.ok){
        toast.warning(message, {className: "bg-yellow-50 text-yellow-500"})
        return;
      }

      const status = responseData?.status as boolean
      if(!status){
        toast.warning(message, {className: "bg-yellow-50 text-yellow-500"})
        return;
      }

      const token = responseData?.token as string
      await setCookie("token", token)
      toast.success(message, {className: "bg-green-100 text-green-100"})

      const role = responseData?.user.role as string 
      if(role === "admin"){
        router.replace("/admin/home")
      }else {
        router.replace("user/home")
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something wrong, try again later`, {className: "bg-rose-50 text-rose-500"})
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
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
                  required
                  value={email}
                  onChange={event => setEmail(event.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required 
                value={password}
                onChange={e => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
