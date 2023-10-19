import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TodoRow from "./todo-row";

export function TodosTable({ todos }: { todos: Todo[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[250px]">Todo</TableHead>
          <TableHead className="text-center">Public</TableHead>
          <TableHead className="text-center">Done</TableHead>
          <TableHead className="text-center">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TodoRow todo={todo} key={todo.id} />
        ))}
      </TableBody>
    </Table>
  );
}
