import AddTodo from "@/components/add-todo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { TodosTable } from "./(components)/todos-table";
import { redirect } from "next/navigation";

export default async function MyTodo() {
  const { data: todos, error: error1 } =
    await createServerComponentClient<Database>({
      cookies,
    })
      .from("todos")
      .select()
      .order("created_at");

  const {
    data: { user },
    error: error2,
  } = await createServerComponentClient<Database>({
    cookies,
  }).auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (error1 || error2) {
    throw new Error("error while fetching my todos");
  }
  return (
    <Tabs defaultValue="all" className="space-y-4 max-w-[400px] mx-2">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="not-done">Not Done</TabsTrigger>
        <TabsTrigger value="done">Done</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <Card className="pb-2 rounded-md">
          <CardHeader>
            <CardTitle className="text-primary">All Todos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pb-4 h-[400px] overflow-auto">
            <TodosTable
              todos={todos.filter((todo) => todo.user_id === user?.id) ?? []}
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="not-done">
        <Card className="pb-2 rounded-md">
          <CardHeader>
            <CardTitle className="text-primary">Not Done Todos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pb-4 h-[400px] overflow-auto">
            <TodosTable
              todos={
                todos
                  .filter((todo) => todo.user_id === user?.id)
                  .filter((todo) => !todo.is_done) ?? []
              }
            />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="done">
        <Card className="pb-2 rounded-md">
          <CardHeader>
            <CardTitle className="text-primary">Done Todos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pb-4 h-[400px] overflow-auto">
            <TodosTable
              todos={
                todos
                  .filter((todo) => todo.user_id === user?.id)
                  .filter((todo) => todo.is_done) ?? []
              }
            />
          </CardContent>
        </Card>
      </TabsContent>
      <AddTodo userAvatar={user?.user_metadata.avatar_url} />
    </Tabs>
  );
}
