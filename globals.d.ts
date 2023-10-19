import type { Database as DB } from "@/lib/databse.types";
declare global {
  type Database = DB;
  type Todo = Database["public"]["Tables"]["todos"]["Row"];
}
