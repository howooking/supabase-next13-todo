import { DarkmodeSwitch } from "@/components/navbar/darkmode-switch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NavbarAvatar } from "./navbar-avatar";
import { cn } from "@/lib/utils";

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="flex items-center justify-between container border-b-[1px] py-2 fixed top-0">
      <Link
        href="/"
        className="font-extrabold text-xl text-primary hover:opacity-80 transition sm:text-3xl pr-2"
      >
        TODO
      </Link>
      <ul className="flex items-center gap-2">
        <li className={cn(!user && "hidden")}>
          <Link href="/my-todo">
            <Button variant="ghost" className="text-xs sm:text-base" size="sm">
              MY TODO
            </Button>
          </Link>
        </li>
        <li className={cn(!user && "hidden")}>
          <Link href="/others-todo">
            <Button variant="ghost" className="text-xs sm:text-base" size="sm">
              OTHERS TODO
            </Button>
          </Link>
        </li>

        <li className="flex items-center">
          {user ? (
            <NavbarAvatar />
          ) : (
            <Button>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </li>
        <li>
          <DarkmodeSwitch />
        </li>
      </ul>
    </nav>
  );
}
