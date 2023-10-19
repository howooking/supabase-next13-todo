"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function LogoutButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { toast } = useToast();

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

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          variant: "destructive",
          title: error.message,
          description: "Try later",
        });
        return;
      }
      toast({
        title: "Bye Bye 🖐️🖐️",
      });
      router.push("/");
    } catch (error) {
      throw new Error("error while signing out");
    }
  };
  return <div onClick={handleLogout}>Logout</div>;
}
