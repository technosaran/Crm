export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          annual_revenue: number | null
          billing_city: string | null
          billing_country: string | null
          billing_postal_code: string | null
          billing_state: string | null
          billing_street: string | null
          created_at: string
          description: string | null
          email: string | null
          id: string
          industry: string
          location: string
          name: string
          number_of_employees: number | null
          owner_id: string
          phone: string | null
          size: string
          type: Database["public"]["Enums"]["account_type"] | null
          updated_at: string
          website: string | null
        }
        Insert: {
          annual_revenue?: number | null
          billing_city?: string | null
          billing_country?: string | null
          billing_postal_code?: string | null
          billing_state?: string | null
          billing_street?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          industry?: string
          location?: string
          name: string
          number_of_employees?: number | null
          owner_id?: string
          phone?: string | null
          size?: string
          type?: Database["public"]["Enums"]["account_type"] | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          annual_revenue?: number | null
          billing_city?: string | null
          billing_country?: string | null
          billing_postal_code?: string | null
          billing_state?: string | null
          billing_street?: string | null
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          industry?: string
          location?: string
          name?: string
          number_of_employees?: number | null
          owner_id?: string
          phone?: string | null
          size?: string
          type?: Database["public"]["Enums"]["account_type"] | null
          updated_at?: string
          website?: string | null
        }
      }
      activities: {
        Row: {
          description: string | null
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_type"]
          id: string
          occurred_at: string
          performed_by_id: string
          subject: string
          type: Database["public"]["Enums"]["activity_type"]
        }
        Insert: {
          description?: string | null
          entity_id: string
          entity_type: Database["public"]["Enums"]["entity_type"]
          id?: string
          occurred_at?: string
          performed_by_id: string
          subject: string
          type: Database["public"]["Enums"]["activity_type"]
        }
        Update: {
          description?: string | null
          entity_id?: string
          entity_type?: Database["public"]["Enums"]["entity_type"]
          id?: string
          occurred_at?: string
          performed_by_id?: string
          subject?: string
          type?: Database["public"]["Enums"]["activity_type"]
        }
      }
      audit_logs: {
        Row: {
          action: string
          details: Json | null
          entity_id: string
          entity_type: string
          id: string
          timestamp: string
          user_id: string
        }
        Insert: {
          action: string
          details?: Json | null
          entity_id: string
          entity_type: string
          id?: string
          timestamp?: string
          user_id: string
        }
        Update: {
          action?: string
          details?: Json | null
          entity_id?: string
          entity_type?: string
          id?: string
          timestamp?: string
          user_id?: string
        }
      }
      cases: {
        Row: {
          account_id: number | null
          case_number: string
          contact_id: number | null
          created_at: string | null
          description: string | null
          id: number
          origin: Database["public"]["Enums"]["case_origin"] | null
          owner_id: string | null
          priority: Database["public"]["Enums"]["case_priority"] | null
          resolution: string | null
          status: Database["public"]["Enums"]["case_status"] | null
          subject: string
          type: Database["public"]["Enums"]["case_type"] | null
          updated_at: string | null
        }
        Insert: {
          account_id?: number | null
          case_number?: string
          contact_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          origin?: Database["public"]["Enums"]["case_origin"] | null
          owner_id?: string | null
          priority?: Database["public"]["Enums"]["case_priority"] | null
          resolution?: string | null
          status?: Database["public"]["Enums"]["case_status"] | null
          subject: string
          type?: Database["public"]["Enums"]["case_type"] | null
          updated_at?: string | null
        }
        Update: {
          account_id?: number | null
          case_number?: string
          contact_id?: number | null
          created_at?: string | null
          description?: string | null
          id?: number
          origin?: Database["public"]["Enums"]["case_origin"] | null
          owner_id?: string | null
          priority?: Database["public"]["Enums"]["case_priority"] | null
          resolution?: string | null
          status?: Database["public"]["Enums"]["case_status"] | null
          subject?: string
          type?: Database["public"]["Enums"]["case_type"] | null
          updated_at?: string | null
        }
      }
      contacts: {
        Row: {
          account_id: number | null
          created_at: string | null
          department: string | null
          do_not_call: boolean | null
          do_not_email: boolean | null
          email: string | null
          first_name: string
          id: number
          is_primary: boolean | null
          last_name: string
          mobile: string | null
          owner_id: string | null
          phone: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          account_id?: number | null
          created_at?: string | null
          department?: string | null
          do_not_call?: boolean | null
          do_not_email?: boolean | null
          email?: string | null
          first_name: string
          id?: number
          is_primary?: boolean | null
          last_name: string
          mobile?: string | null
          owner_id?: string | null
          phone?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          account_id?: number | null
          created_at?: string | null
          department?: string | null
          do_not_call?: boolean | null
          do_not_email?: boolean | null
          email?: string | null
          first_name?: string
          id?: number
          is_primary?: boolean | null
          last_name?: string
          mobile?: string | null
          owner_id?: string | null
          phone?: string | null
          title?: string | null
          updated_at?: string | null
        }
      }
      leads: {
        Row: {
          company: string | null
          company_id: string | null
          company_name: string
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          owner_id: string
          phone: string | null
          source: string
          status: Database["public"]["Enums"]["lead_status"]
          tags: string[] | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          company_id?: string | null
          company_name?: string
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          owner_id?: string
          phone?: string | null
          source: string
          status?: Database["public"]["Enums"]["lead_status"]
          tags?: string[] | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          company_id?: string | null
          company_name?: string
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          owner_id?: string
          phone?: string | null
          source?: string
          status?: Database["public"]["Enums"]["lead_status"]
          tags?: string[] | null
          updated_at?: string
        }
      }
      opportunities: {
        Row: {
          account_id: string
          account_name: string | null
          amount: number
          closed_at: string | null
          contact_id: number | null
          created_at: string
          description: string | null
          expected_close_date: string
          id: string
          lead_source: string | null
          name: string | null
          next_step: string | null
          owner_id: string
          probability: number
          stage: Database["public"]["Enums"]["opportunity_stage"]
          title: string
          updated_at: string
        }
        Insert: {
          account_id?: string
          account_name?: string | null
          amount?: number
          closed_at?: string | null
          contact_id?: number | null
          created_at?: string
          description?: string | null
          expected_close_date?: string
          id?: string
          lead_source?: string | null
          name?: string | null
          next_step?: string | null
          owner_id?: string
          probability?: number
          stage?: Database["public"]["Enums"]["opportunity_stage"]
          title?: string
          updated_at?: string
        }
        Update: {
          account_id?: string
          account_name?: string | null
          amount?: number
          closed_at?: string | null
          contact_id?: number | null
          created_at?: string
          description?: string | null
          expected_close_date?: string
          id?: string
          lead_source?: string | null
          name?: string | null
          next_step?: string | null
          owner_id?: string
          probability?: number
          stage?: Database["public"]["Enums"]["opportunity_stage"]
          title?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          assigned_to_id: string | null
          completed_at: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          entity_id: number | null
          entity_type: string | null
          id: number
          owner_id: string | null
          priority: Database["public"]["Enums"]["task_priority"] | null
          reminder_at: string | null
          status: Database["public"]["Enums"]["task_status"] | null
          subject: string
          updated_at: string | null
        }
        Insert: {
          assigned_to_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          entity_id?: number | null
          entity_type?: string | null
          id?: number
          owner_id?: string | null
          priority?: Database["public"]["Enums"]["task_priority"] | null
          reminder_at?: string | null
          status?: Database["public"]["Enums"]["task_status"] | null
          subject: string
          updated_at?: string | null
        }
        Update: {
          assigned_to_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          entity_id?: number | null
          entity_type?: string | null
          id?: number
          owner_id?: string | null
          priority?: Database["public"]["Enums"]["task_priority"] | null
          reminder_at?: string | null
          status?: Database["public"]["Enums"]["task_status"] | null
          subject?: string
          updated_at?: string | null
        }
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          department: string | null
          email: string
          id: string
          is_active: boolean | null
          last_login: string | null
          name: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_profile_role"] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email: string
          id: string
          is_active?: boolean | null
          last_login?: string | null
          name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_profile_role"] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          department?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          name?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_profile_role"] | null
          updated_at?: string | null
        }
      }
      users: {
        Row: {
          avatar: string | null
          created_at: string
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          email: string
          id: string
          name: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      account_type:
        | "CUSTOMER"
        | "PROSPECT"
        | "PARTNER"
        | "VENDOR"
        | "COMPETITOR"
        | "OTHER"
      activity_type: "CALL" | "EMAIL" | "MEETING" | "TASK" | "NOTE"
      case_origin: "PHONE" | "EMAIL" | "WEB" | "CHAT" | "SOCIAL_MEDIA"
      case_priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
      case_status:
        | "NEW"
        | "OPEN"
        | "IN_PROGRESS"
        | "ESCALATED"
        | "ON_HOLD"
        | "CLOSED"
        | "RESOLVED"
      case_type: "QUESTION" | "PROBLEM" | "FEATURE_REQUEST" | "BUG" | "OTHER"
      entity_type: "LEAD" | "ACCOUNT" | "OPPORTUNITY"
      lead_status: "New" | "Working" | "Nurturing" | "Qualified" | "Unqualified"
      opportunity_stage:
        | "NEW"
        | "QUALIFICATION"
        | "NEEDS_ANALYSIS"
        | "VALUE_PROPOSITION"
        | "PROPOSAL"
        | "NEGOTIATION"
        | "CLOSED_WON"
        | "CLOSED_LOST"
      task_priority: "LOW" | "NORMAL" | "HIGH" | "URGENT"
      task_status:
        | "NOT_STARTED"
        | "IN_PROGRESS"
        | "COMPLETED"
        | "WAITING"
        | "DEFERRED"
      user_profile_role:
        | "SUPER_ADMIN"
        | "ADMIN"
        | "MANAGER"
        | "SALES"
        | "SUPPORT"
        | "GUEST"
      user_role: "ADMIN" | "MANAGER" | "SALES" | "SUPPORT"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]
