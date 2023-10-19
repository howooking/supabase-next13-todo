"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { AiOutlineLoading3Quarters, AiOutlineMail } from "react-icons/ai";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "please type correct email format" }),
  password: z.string(),
});

export function LoginForm() {
  const { toast } = useToast();
  const [isSigningin, setIsSigningin] = useState({
    password: false,
    google: false,
    kakao: false,
  });
  const router = useRouter();
  const supabase = createClientComponentClient<Database>(); // 이렇게 사용처마다 인스턴스 불러도 된는겨?

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handlePasswordLogin = async (values: z.infer<typeof formSchema>) => {
    setIsSigningin((prev) => ({ ...prev, password: true }));
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) {
        toast({
          variant: "destructive",
          title: error.message,
          description: "Try again with another email or password",
        });
        return;
      }
      toast({
        title: "Welcome!",
        description: "Time to do your tasks!",
      });
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "error while signing in with google",
        description: "Try agin",
      });
      console.error(error);
    } finally {
      setIsSigningin((prev) => ({ ...prev, password: false }));
    }
  };

  const handleGoogleLogin = async () => {
    setIsSigningin((prev) => ({ ...prev, google: true }));
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `https://supabase-next13-todo.vercel.app/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) {
        toast({
          variant: "destructive",
          title: error.message,
          description: "Try later",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "error while signing in with google",
        description: "Try later",
      });
      console.error(error);
    } finally {
      setIsSigningin((prev) => ({ ...prev, google: false }));
    }
  };

  const handleKakaoLogin = async () => {
    setIsSigningin((prev) => ({ ...prev, kakao: true }));
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: `https://supabase-next13-todo.vercel.app/auth/callback`,
        },
      });
      if (error) {
        toast({
          variant: "destructive",
          title: error.message,
          description: "Try later",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "error while signing in with kakao",
        description: "Try later",
      });
      console.error(error);
    } finally {
      setIsSigningin((prev) => ({ ...prev, kakao: false }));
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handlePasswordLogin)}
        className="space-y-6"
      >
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
                  <Input placeholder="password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-2">
          <Button type="submit" className="flex gap-2 w-full">
            {isSigningin.password ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <>
                <AiOutlineMail size={20} />
                <span>Login With Email</span>
              </>
            )}
          </Button>
          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="flex gap-2 w-full"
            variant="outline"
          >
            {isSigningin.google ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <>
                <FcGoogle size={20} />
                <span>Login With Google</span>
              </>
            )}
          </Button>
          <Button
            type="button"
            onClick={handleKakaoLogin}
            className="flex gap-2 w-full"
            variant="outline"
          >
            {isSigningin.kakao ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <>
                <RiKakaoTalkFill size={20} />
                <span>Login With Kakao</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
