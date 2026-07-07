import { TodoApp } from "@/components/todos/todo-app";
import { fetchTodos } from "@/lib/todos";

export const dynamic = "force-dynamic";

export default async function Home() {
  const todos = await fetchTodos();

  return <TodoApp initialTodos={todos} />;
}
