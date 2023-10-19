import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { title, user_avatar } = await request.json();
  const { data } = await createRouteHandlerClient({ cookies })
    .from("todos")
    .insert({ title, user_avatar });
  return NextResponse.json(data);
}
export async function DELETE(request: NextRequest) {
  const { id } = await request.json();
  const { data } = await createRouteHandlerClient({ cookies })
    .from("todos")
    .delete()
    .match({ id });

  return NextResponse.json(data);
}

export async function PUT(request: NextRequest) {
  const { id, is_done, is_public, type } = await request.json();
  const supabase = createRouteHandlerClient({ cookies });
  if (type === "done") {
    const { data } = await supabase
      .from("todos")
      .update({ is_done: !is_done })
      .match({ id });
    return NextResponse.json(data);
  }
  if (type === "public") {
    const { data } = await supabase
      .from("todos")
      .update({ is_public: !is_public })
      .match({ id });
    return NextResponse.json(data);
  }
}
