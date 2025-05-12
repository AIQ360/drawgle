export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      images: {
        Row: {
          id: string
          user_id: string
          prompt: string
          image_url: string
          aspect_ratio: string
          model: string
          created_at: string
          is_public: boolean
        }
        Insert: {
          id?: string
          user_id: string
          prompt: string
          image_url: string
          aspect_ratio?: string
          model: string
          created_at?: string
          is_public?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          prompt?: string
          image_url?: string
          aspect_ratio?: string
          model?: string
          created_at?: string
          is_public?: boolean
        }
      }
      gemini_images: {
        Row: {
          id: string
          user_id: string
          original_image_url: string
          coloring_page_url: string
          prompt: string
          aspect_ratio: string
          created_at: string
          is_public: boolean
        }
        Insert: {
          id?: string
          user_id: string
          original_image_url: string
          coloring_page_url: string
          prompt?: string
          aspect_ratio?: string
          created_at?: string
          is_public?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          original_image_url?: string
          coloring_page_url?: string
          prompt?: string
          aspect_ratio?: string
          created_at?: string
          is_public?: boolean
        }
      }
      users_metadata: {
        Row: {
          id: string
          credits: number
          subscription_tier: string
          subscription_status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          credits?: number
          subscription_tier?: string
          subscription_status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          credits?: number
          subscription_tier?: string
          subscription_status?: string
          created_at?: string
          updated_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          status: string
          current_period_start: string
          current_period_end: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          status: string
          current_period_start?: string
          current_period_end?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          status?: string
          current_period_start?: string
          current_period_end?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
