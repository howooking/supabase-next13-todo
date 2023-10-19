import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { OthersTodosTable } from "./(components)/others-todos-table";
import supabase from "@/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function OthersTodo() {
  const { data: todos } = await supabase
    .from("todos")
    .select()
    .order("created_at");

  const {
    data: { user },
    error,
  } = await createServerComponentClient<Database>({
    cookies,
  }).auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (error) {
    throw new Error("error while fetching my todos");
  }
  return (
    <Card className="pb-2 max-w-[400px] mx-2 rounded-md">
      <CardHeader>
        <CardTitle className="text-primary">Others Todos</CardTitle>
        <CardDescription>See what others are upto</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 pb-4 h-[400px] overflow-auto">
        <OthersTodosTable
          todos={todos?.filter((todo) => todo.user_id !== user.id) ?? []}
        />
      </CardContent>
    </Card>
  );
}
