"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AddTodo({ userAvatar }: { userAvatar: string }) {
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  const todoInputRef = useRef<HTMLInputElement>(null);

  const handleAddNewTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (todoInputRef.current && todoInputRef.current.value.length < 1) {
      todoInputRef.current.focus();
      return;
    }
    setIsAdding(true);
    try {
      await fetch(`https://supabase-next13-todo.vercel.app//todo/api`, {
        method: "POST",
        body: JSON.stringify({
          title: todoInputRef?.current?.value,
          user_avatar: userAvatar,
        }),
      });
      router.refresh();
    } catch (error) {
      console.error(error, "error while updating");
    } finally {
      setIsAdding(false);
      if (todoInputRef.current) {
        todoInputRef.current.value = "";
      }
    }
  };

  return (
    <form className="relative" onSubmit={handleAddNewTodo}>
      <Input ref={todoInputRef} />
      <Button
        type="submit"
        disabled={isAdding}
        className="absolute right-0 rounded-tl-none rounded-bl-none top-0 w-16"
      >
        {isAdding ? (
          <AiOutlineLoading3Quarters
            className="animate-spin text-white mx-auto"
            size={20}
          />
        ) : (
          "Add"
        )}
      </Button>
    </form>
  );
}
