"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OthersTodoRow from "./others-todo-row";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import supabase from "@/lib/supabase";

export function OthersTodosTable({ todos }: { todos: Todo[] }) {
  const router = useRouter();
  useEffect(() => {
    const channel = supabase
      .channel("real time todos")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "todos",
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">User</TableHead>
          <TableHead className="w-[250px]">Todo</TableHead>
          <TableHead className="text-center">Done</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <OthersTodoRow todo={todo} key={todo.id} />
        ))}
      </TableBody>
    </Table>
  );
}
