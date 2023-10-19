"use client";

import { AiOutlineDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

export default function TodoRow({ todo }: { todo: Todo }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteTodo = async () => {
    setIsDeleting(true);
    try {
      await fetch(`${location.origin}/todo/api`, {
        method: "DELETE",
        body: JSON.stringify({ id: todo.id }),
      });
      router.refresh();
    } catch (error) {
      console.error(error, "error while deleting a todo");
      throw new Error("error while deleting a todo");
    } finally {
      setIsDeleting(false);
    }
  };

  const [isTogglingTodo, setIsTogglingTodo] = useState(false);
  const handleToggleDone = async () => {
    setIsTogglingTodo(true);
    try {
      await fetch(`${location.origin}/todo/api`, {
        method: "PUT",
        body: JSON.stringify({
          type: "done",
          id: todo.id,
          is_done: todo.is_done,
        }),
      });
      router.refresh();
    } catch (error) {
      console.error(error, "error while toggling a todo");
      throw new Error("error while toggling a todo");
    } finally {
      setIsTogglingTodo(false);
    }
  };

  const [isTogglingPublic, setIsTogglingPublic] = useState(false);
  const handleTogglePublic = async () => {
    setIsTogglingPublic(true);
    try {
      await fetch(`${location.origin}/todo/api/`, {
        method: "PUT",
        body: JSON.stringify({
          type: "public",
          id: todo.id,
          is_public: todo.is_public,
        }),
      });
      router.refresh();
    } catch (error) {
      console.error(error, "error while toggling public");
      throw new Error("error while toggling public");
    } finally {
      setIsTogglingPublic(false);
    }
  };

  return (
    <TableRow>
      <TableCell className={cn("", todo.is_done && "opacity-20")}>
        {todo.title}
      </TableCell>
      <TableCell className="text-center">
        <Switch
          disabled={isTogglingPublic}
          onClick={handleTogglePublic}
          checked={todo.is_public}
        />
      </TableCell>
      <TableCell className="text-center px-2">
        {isTogglingTodo ? (
          <AiOutlineLoading3Quarters className="animate-spin text-primary mx-auto" />
        ) : (
          <Checkbox
            className="mr-2"
            disabled={isTogglingTodo}
            onClick={handleToggleDone}
            checked={todo.is_done}
          />
        )}
      </TableCell>
      <TableCell>
        {isDeleting ? (
          <AiOutlineLoading3Quarters
            className="animate-spin text-primary mx-auto"
            size={20}
          />
        ) : (
          <AiOutlineDelete
            size={20}
            className="text-primary cursor-pointer hover:opacity-70 mx-auto"
            onClick={handleDeleteTodo}
          />
        )}
      </TableCell>
    </TableRow>
  );
}
