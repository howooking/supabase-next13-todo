"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LoginTab } from "@/components/navbar/login-tab";

export function LoginModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>LOGIN</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <LoginTab />
      </DialogContent>
    </Dialog>
  );
}
