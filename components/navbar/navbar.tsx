import { DarkmodeSwitch } from "@/components/navbar/darkmode-switch";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { UserAvatar } from "@/components/user-avatar";
import { LoginModal } from "@/components/navbar/login-modal";

export default async function Navbar() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <nav className="flex items-center justify-between container border-b-[1px] py-2">
      <Link
        href="/"
        className="font-extrabold text-3xl text-primary hover:opacity-80 transition"
      >
        TODO LIKE
      </Link>
      <ul className="flex items-center gap-3">
        <li>
          <Button variant="outline">MY TODOS</Button>
        </li>
        <li>
          <Button variant="outline">PUBLIC TODOS</Button>
        </li>

        <li>{session ? <UserAvatar /> : <LoginModal />}</li>
        <li>
          <DarkmodeSwitch />
        </li>
      </ul>
    </nav>
  );
}
