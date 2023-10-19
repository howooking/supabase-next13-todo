"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "@/components/ui/use-toast";

export function SignupForm() {
  const { toast } = useToast();
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase.auth]);

  const formSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordCheck: z
      .string()
      .refine((val) => val === passwordRef.current?.value, {
        message: "Passwords do not match",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [message, setMessage] = useState("");
  const [isSigningup, setIsSigningup] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSigningup(true);
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: `https://supabase-next13-todo.vercel.app/auth/callback`,
        },
      });
      if (error) {
        toast({
          variant: "destructive",
          title: error.message,
          description: "Try later",
        });
        return;
      }
      if (user?.identities?.length === 0) {
        toast({
          variant: "destructive",
          title: "This email is already signed up",
          description: "Contact admin",
        });
        return;
      }
      toast({
        title: "Sent cofirmation email",
        description: "Check your email",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error while signing up",
        description: "Try later",
      });
    } finally {
      setIsSigningup(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    {...field}
                    type="password"
                    ref={passwordRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordCheck"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password Check</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <span>{message}</span>
        <Button className="w-full" type="submit" disabled={isSigningup}>
          {isSigningup ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            "SIGN UP"
          )}
        </Button>
      </form>
    </Form>
  );
}
