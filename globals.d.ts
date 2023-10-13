import type { Database as DB } from "@/types/database.types";
declare global {
  type Database = DB;
  type Todo = Database["public"]["Tables"]["todos"]["Row"];
}
