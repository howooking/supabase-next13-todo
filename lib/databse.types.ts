export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      todos: {
        Row: {
          created_at: string;
          id: string;
          is_done: boolean;
          is_public: boolean;
          title: string;
          user_avatar: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_done?: boolean;
          is_public?: boolean;
          title: string;
          user_avatar?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_done?: boolean;
          is_public?: boolean;
          title?: string;
          user_avatar?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
