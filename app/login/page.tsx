"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./(components)/login-form";
import { SignupForm } from "./(components)/signup-form";

export default function Login() {
  return (
    <Tabs defaultValue="login" className="space-y-4 min-w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">LOGIN</TabsTrigger>
        <TabsTrigger value="signup">SIGN UP</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Login</CardTitle>
            <CardDescription>
              Continue with email or social login.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 pb-4">
            <LoginForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Sign up</CardTitle>
            <CardDescription>Sign up with your email.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 pb-4">
            <SignupForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
