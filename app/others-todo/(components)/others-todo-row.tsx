import { TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { UserAvatar } from "./user-avatar";
import { Checkbox } from "@/components/ui/checkbox";

export default function OthersTodoRow({ todo }: { todo: Todo }) {
  return (
    <TableRow>
      <TableCell>
        <UserAvatar imgUrl={todo.user_avatar} fallback={""} />
      </TableCell>
      <TableCell className={cn(todo.is_done && "opacity-20")}>
        {todo.title}
      </TableCell>

      <TableCell className="text-center">
        <Checkbox checked={todo.is_done} className="cursor-default" />
      </TableCell>
    </TableRow>
  );
}
