"use client";

import Lottie from "lottie-react";
import lotti from "@/public/animation_check.json";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center gap-2 p-2">
      <h1 className="text-3xl sm:text-6xl font-bold">
        Welcome to <span className="text-primary">Todo</span> Master
      </h1>
      <Lottie animationData={lotti} className="w-[400px]" />
      <p className="text-md sm:text-2xl">
        A place where tasks are no longer forgotten!
      </p>
      <Link href="/my-todo">
        <Button>Start Now</Button>
      </Link>
    </div>
  );
}
