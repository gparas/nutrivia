export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      diary: {
        Row: {
          date: string
          exercise: number | null
          id: string
          meal_category: string
          meal_id: string
          user_id: string
          water: number | null
        }
        Insert: {
          date?: string
          exercise?: number | null
          id?: string
          meal_category: string
          meal_id: string
          user_id: string
          water?: number | null
        }
        Update: {
          date?: string
          exercise?: number | null
          id?: string
          meal_category?: string
          meal_id?: string
          user_id?: string
          water?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "diary_meal_id_fkey"
            columns: ["meal_id"]
            isOneToOne: false
            referencedRelation: "meals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "diary_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      meals: {
        Row: {
          carbs: number
          category: string
          description: string | null
          fat: number
          id: string
          image: string
          kcal: number
          name: string
          price: number
          protein: number
        }
        Insert: {
          carbs: number
          category: string
          description?: string | null
          fat: number
          id?: string
          image: string
          kcal: number
          name: string
          price: number
          protein: number
        }
        Update: {
          carbs?: number
          category?: string
          description?: string | null
          fat?: number
          id?: string
          image?: string
          kcal?: number
          name?: string
          price?: number
          protein?: number
        }
        Relationships: []
      }
      nutritionists: {
        Row: {
          description: string | null
          email: string
          experience: number | null
          expertise: string | null
          id: string
          image: string
          location: string | null
          name: string
          phone: string
          rating: number | null
        }
        Insert: {
          description?: string | null
          email: string
          experience?: number | null
          expertise?: string | null
          id?: string
          image: string
          location?: string | null
          name: string
          phone: string
          rating?: number | null
        }
        Update: {
          description?: string | null
          email?: string
          experience?: number | null
          expertise?: string | null
          id?: string
          image?: string
          location?: string | null
          name?: string
          phone?: string
          rating?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          activity: string | null
          age: number | null
          avatar_url: string | null
          created_at: string
          food_preference: string | null
          full_name: string | null
          gender: string | null
          goal: string | null
          height: string | null
          id: string
          nutritionist_id: string | null
          target_weight: string | null
          updated_at: string | null
          weight: string | null
        }
        Insert: {
          activity?: string | null
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          food_preference?: string | null
          full_name?: string | null
          gender?: string | null
          goal?: string | null
          height?: string | null
          id: string
          nutritionist_id?: string | null
          target_weight?: string | null
          updated_at?: string | null
          weight?: string | null
        }
        Update: {
          activity?: string | null
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          food_preference?: string | null
          full_name?: string | null
          gender?: string | null
          goal?: string | null
          height?: string | null
          id?: string
          nutritionist_id?: string | null
          target_weight?: string | null
          updated_at?: string | null
          weight?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_nutritionist_id_fkey"
            columns: ["nutritionist_id"]
            isOneToOne: false
            referencedRelation: "nutritionists"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
