export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      admin_roles: {
        Row: {
          created_at: string
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      analytics_alerts: {
        Row: {
          created_at: string
          data: Json | null
          id: string
          message: string
          resolved: boolean | null
          severity: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data?: Json | null
          id?: string
          message: string
          resolved?: boolean | null
          severity: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: Json | null
          id?: string
          message?: string
          resolved?: boolean | null
          severity?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      analytics_campaigns: {
        Row: {
          budget_cents: number | null
          campaign_type: string | null
          clicks: number | null
          conversions: number | null
          created_at: string
          ctr_percentage: number | null
          ended_at: string | null
          id: string
          name: string
          platform: string
          spent_cents: number | null
          started_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          budget_cents?: number | null
          campaign_type?: string | null
          clicks?: number | null
          conversions?: number | null
          created_at?: string
          ctr_percentage?: number | null
          ended_at?: string | null
          id?: string
          name: string
          platform: string
          spent_cents?: number | null
          started_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          budget_cents?: number | null
          campaign_type?: string | null
          clicks?: number | null
          conversions?: number | null
          created_at?: string
          ctr_percentage?: number | null
          ended_at?: string | null
          id?: string
          name?: string
          platform?: string
          spent_cents?: number | null
          started_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          browser: string | null
          country: string | null
          created_at: string
          device_type: string | null
          event_name: string
          event_type: string
          id: string
          page_url: string | null
          properties: Json | null
          referrer_url: string | null
          session_id: string
          user_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          browser?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          event_name: string
          event_type: string
          id?: string
          page_url?: string | null
          properties?: Json | null
          referrer_url?: string | null
          session_id: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          browser?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          event_name?: string
          event_type?: string
          id?: string
          page_url?: string | null
          properties?: Json | null
          referrer_url?: string | null
          session_id?: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      analytics_revenue: {
        Row: {
          amount_cents: number
          created_at: string
          currency: string
          id: string
          ltv_cents: number | null
          mrr_cents: number | null
          subscription_tier: string | null
          transaction_type: string
          user_id: string | null
        }
        Insert: {
          amount_cents: number
          created_at?: string
          currency?: string
          id?: string
          ltv_cents?: number | null
          mrr_cents?: number | null
          subscription_tier?: string | null
          transaction_type: string
          user_id?: string | null
        }
        Update: {
          amount_cents?: number
          created_at?: string
          currency?: string
          id?: string
          ltv_cents?: number | null
          mrr_cents?: number | null
          subscription_tier?: string | null
          transaction_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      analytics_sessions: {
        Row: {
          browser: string | null
          country: string | null
          created_at: string
          device_type: string | null
          duration_seconds: number | null
          ended_at: string | null
          id: string
          page_views: number | null
          session_id: string
          started_at: string
          traffic_source: string | null
          updated_at: string
          user_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          browser?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          page_views?: number | null
          session_id: string
          started_at?: string
          traffic_source?: string | null
          updated_at?: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          browser?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          duration_seconds?: number | null
          ended_at?: string | null
          id?: string
          page_views?: number | null
          session_id?: string
          started_at?: string
          traffic_source?: string | null
          updated_at?: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      archive_operations: {
        Row: {
          archive_url: string | null
          auto_scheduled: boolean | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          criteria: Json
          error_message: string | null
          id: string
          operation_type: string
          records_affected: number | null
          size_saved_bytes: number | null
          started_at: string | null
          status: string
          table_name: string
          updated_at: string
        }
        Insert: {
          archive_url?: string | null
          auto_scheduled?: boolean | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          criteria: Json
          error_message?: string | null
          id?: string
          operation_type: string
          records_affected?: number | null
          size_saved_bytes?: number | null
          started_at?: string | null
          status?: string
          table_name: string
          updated_at?: string
        }
        Update: {
          archive_url?: string | null
          auto_scheduled?: boolean | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          criteria?: Json
          error_message?: string | null
          id?: string
          operation_type?: string
          records_affected?: number | null
          size_saved_bytes?: number | null
          started_at?: string | null
          status?: string
          table_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      archived_analytics_events: {
        Row: {
          archive_operation_id: string | null
          archived_at: string
          browser: string | null
          country: string | null
          created_at: string
          device_type: string | null
          event_name: string
          event_type: string
          id: string
          original_id: string
          page_url: string | null
          properties: Json | null
          referrer_url: string | null
          session_id: string
          user_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          archive_operation_id?: string | null
          archived_at?: string
          browser?: string | null
          country?: string | null
          created_at: string
          device_type?: string | null
          event_name: string
          event_type: string
          id?: string
          original_id: string
          page_url?: string | null
          properties?: Json | null
          referrer_url?: string | null
          session_id: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          archive_operation_id?: string | null
          archived_at?: string
          browser?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          event_name?: string
          event_type?: string
          id?: string
          original_id?: string
          page_url?: string | null
          properties?: Json | null
          referrer_url?: string | null
          session_id?: string
          user_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "archived_analytics_events_archive_operation_id_fkey"
            columns: ["archive_operation_id"]
            isOneToOne: false
            referencedRelation: "archive_operations"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_settings: {
        Row: {
          auto_collection: boolean | null
          created_at: string
          currency: string
          id: string
          payout_frequency: string | null
          stripe_publishable_key: string | null
          stripe_webhook_secret: string | null
          tax_rate_percentage: number | null
          trial_period_days: number | null
          updated_at: string
        }
        Insert: {
          auto_collection?: boolean | null
          created_at?: string
          currency?: string
          id?: string
          payout_frequency?: string | null
          stripe_publishable_key?: string | null
          stripe_webhook_secret?: string | null
          tax_rate_percentage?: number | null
          trial_period_days?: number | null
          updated_at?: string
        }
        Update: {
          auto_collection?: boolean | null
          created_at?: string
          currency?: string
          id?: string
          payout_frequency?: string | null
          stripe_publishable_key?: string | null
          stripe_webhook_secret?: string | null
          tax_rate_percentage?: number | null
          trial_period_days?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_post_analytics: {
        Row: {
          avg_time_on_page_seconds: number | null
          bounce_rate_percentage: number | null
          created_at: string
          date: string
          id: string
          post_id: string
          shares: number | null
          unique_views: number | null
          views: number | null
        }
        Insert: {
          avg_time_on_page_seconds?: number | null
          bounce_rate_percentage?: number | null
          created_at?: string
          date?: string
          id?: string
          post_id: string
          shares?: number | null
          unique_views?: number | null
          views?: number | null
        }
        Update: {
          avg_time_on_page_seconds?: number | null
          bounce_rate_percentage?: number | null
          created_at?: string
          date?: string
          id?: string
          post_id?: string
          shares?: number | null
          unique_views?: number | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_analytics_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_post_categories: {
        Row: {
          category_id: string
          post_id: string
        }
        Insert: {
          category_id: string
          post_id: string
        }
        Update: {
          category_id?: string
          post_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_blog_post_categories_category_id"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_blog_post_categories_post_id"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string
          content: string
          created_at: string
          excerpt: string | null
          featured_image_url: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          published: boolean
          published_at: string | null
          reading_minutes: number | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          published_at?: string | null
          reading_minutes?: number | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image_url?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          published?: boolean
          published_at?: string | null
          reading_minutes?: number | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_blog_posts_author"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string
          id: string
          parent_comment_id: string | null
          post_slug: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          parent_comment_id?: string | null
          post_slug: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          parent_comment_id?: string | null
          post_slug?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_parent_comment_id_fkey"
            columns: ["parent_comment_id"]
            isOneToOne: false
            referencedRelation: "comments"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          admin_id: string | null
          archived: boolean
          created_at: string
          flagged: boolean | null
          guest_id: string | null
          id: string
          last_message_at: string | null
          resolved: boolean | null
          status: string
          title: string | null
          unread_count: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_id?: string | null
          archived?: boolean
          created_at?: string
          flagged?: boolean | null
          guest_id?: string | null
          id?: string
          last_message_at?: string | null
          resolved?: boolean | null
          status?: string
          title?: string | null
          unread_count?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_id?: string | null
          archived?: boolean
          created_at?: string
          flagged?: boolean | null
          guest_id?: string | null
          id?: string
          last_message_at?: string | null
          resolved?: boolean | null
          status?: string
          title?: string | null
          unread_count?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      courses: {
        Row: {
          created_at: string
          description: string | null
          id: string
          price: number
          published: boolean
          slug: string
          stripe_price_id: string | null
          stripe_product_id: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          visibility: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          price?: number
          published?: boolean
          slug: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          visibility?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          price?: number
          published?: boolean
          slug?: string
          stripe_price_id?: string | null
          stripe_product_id?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          visibility?: string
        }
        Relationships: []
      }
      database_health: {
        Row: {
          connection_count: number
          created_at: string
          database_size_bytes: number
          error_message: string | null
          id: string
          last_checked_at: string
          project_id: string
          project_name: string
          response_time_ms: number | null
          status: string
          table_count: number
        }
        Insert: {
          connection_count?: number
          created_at?: string
          database_size_bytes?: number
          error_message?: string | null
          id?: string
          last_checked_at?: string
          project_id: string
          project_name: string
          response_time_ms?: number | null
          status?: string
          table_count?: number
        }
        Update: {
          connection_count?: number
          created_at?: string
          database_size_bytes?: number
          error_message?: string | null
          id?: string
          last_checked_at?: string
          project_id?: string
          project_name?: string
          response_time_ms?: number | null
          status?: string
          table_count?: number
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount_cents: number
          created_at: string
          currency: string
          due_date: string | null
          id: string
          invoice_number: string
          invoice_url: string | null
          paid_at: string | null
          status: string
          stripe_invoice_id: string | null
          subscription_id: string | null
          tax_cents: number | null
          total_cents: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount_cents: number
          created_at?: string
          currency?: string
          due_date?: string | null
          id?: string
          invoice_number: string
          invoice_url?: string | null
          paid_at?: string | null
          status?: string
          stripe_invoice_id?: string | null
          subscription_id?: string | null
          tax_cents?: number | null
          total_cents: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount_cents?: number
          created_at?: string
          currency?: string
          due_date?: string | null
          id?: string
          invoice_number?: string
          invoice_url?: string | null
          paid_at?: string | null
          status?: string
          stripe_invoice_id?: string | null
          subscription_id?: string | null
          tax_cents?: number | null
          total_cents?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          content: string | null
          content_type: string
          course_id: string
          created_at: string
          duration_minutes: number | null
          id: string
          is_free: boolean
          order_index: number
          section_id: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          content_type?: string
          course_id: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          is_free?: boolean
          order_index?: number
          section_id?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          content_type?: string
          course_id?: string
          created_at?: string
          duration_minutes?: number | null
          id?: string
          is_free?: boolean
          order_index?: number
          section_id?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_section_id_fkey"
            columns: ["section_id"]
            isOneToOne: false
            referencedRelation: "sections"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          message_type: string
          read_at: string | null
          sender_id: string | null
          sender_type: string
          updated_at: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          message_type?: string
          read_at?: string | null
          sender_id?: string | null
          sender_type?: string
          updated_at?: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          message_type?: string
          read_at?: string | null
          sender_id?: string | null
          sender_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_auto_sends: {
        Row: {
          blog_post_id: string | null
          content: string
          created_at: string
          error_message: string | null
          id: string
          scheduled_at: string
          sent_at: string | null
          status: string
          subject: string
        }
        Insert: {
          blog_post_id?: string | null
          content: string
          created_at?: string
          error_message?: string | null
          id?: string
          scheduled_at?: string
          sent_at?: string | null
          status?: string
          subject: string
        }
        Update: {
          blog_post_id?: string | null
          content?: string
          created_at?: string
          error_message?: string | null
          id?: string
          scheduled_at?: string
          sent_at?: string | null
          status?: string
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_auto_sends_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
          source: string | null
          status: string
          subscribed_at: string
          unsubscribed_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          source?: string | null
          status?: string
          subscribed_at?: string
          unsubscribed_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          source?: string | null
          status?: string
          subscribed_at?: string
          unsubscribed_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          read: boolean
          title: string
          type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          read?: boolean
          title: string
          type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          read?: boolean
          title?: string
          type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          amount: number
          course_id: string | null
          created_at: string
          currency: string | null
          id: string
          status: string | null
          stripe_payment_intent_id: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          course_id?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          course_id?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          status?: string | null
          stripe_payment_intent_id?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount_cents: number
          created_at: string
          currency: string
          id: string
          invoice_id: string | null
          payment_method: string | null
          status: string
          stripe_payment_intent_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount_cents: number
          created_at?: string
          currency?: string
          id?: string
          invoice_id?: string | null
          payment_method?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount_cents?: number
          created_at?: string
          currency?: string
          id?: string
          invoice_id?: string | null
          payment_method?: string | null
          status?: string
          stripe_payment_intent_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          email: string | null
          id: string
          is_online: boolean | null
          last_seen_at: string | null
          last_sign_in_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          is_online?: boolean | null
          last_seen_at?: string | null
          last_sign_in_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          email?: string | null
          id?: string
          is_online?: boolean | null
          last_seen_at?: string | null
          last_sign_in_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          code: string
          created_at: string
          discount_type: string
          discount_value: number
          id: string
          is_active: boolean
          name: string
          updated_at: string
          usage_limit: number | null
          used_count: number | null
          valid_from: string
          valid_until: string | null
        }
        Insert: {
          code: string
          created_at?: string
          discount_type?: string
          discount_value: number
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
          usage_limit?: number | null
          used_count?: number | null
          valid_from?: string
          valid_until?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          discount_type?: string
          discount_value?: number
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
          usage_limit?: number | null
          used_count?: number | null
          valid_from?: string
          valid_until?: string | null
        }
        Relationships: []
      }
      sections: {
        Row: {
          course_id: string
          created_at: string
          description: string | null
          id: string
          order_index: number
          slug: string | null
          title: string
          updated_at: string
        }
        Insert: {
          course_id: string
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number
          slug?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          course_id?: string
          created_at?: string
          description?: string | null
          id?: string
          order_index?: number
          slug?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sections_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      service_plans: {
        Row: {
          billing_cycle: string
          created_at: string
          description: string | null
          features: Json | null
          id: string
          is_active: boolean
          is_popular: boolean
          name: string
          price_cents: number
          updated_at: string
        }
        Insert: {
          billing_cycle?: string
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean
          is_popular?: boolean
          name: string
          price_cents: number
          updated_at?: string
        }
        Update: {
          billing_cycle?: string
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean
          is_popular?: boolean
          name?: string
          price_cents?: number
          updated_at?: string
        }
        Relationships: []
      }
      storage_health: {
        Row: {
          created_at: string
          error_message: string | null
          file_count: number
          id: string
          last_checked_at: string
          project_id: string
          project_name: string
          response_time_ms: number | null
          status: string
          total_storage_bytes: number
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          file_count?: number
          id?: string
          last_checked_at?: string
          project_id: string
          project_name: string
          response_time_ms?: number | null
          status?: string
          total_storage_bytes?: number
        }
        Update: {
          created_at?: string
          error_message?: string | null
          file_count?: number
          id?: string
          last_checked_at?: string
          project_id?: string
          project_name?: string
          response_time_ms?: number | null
          status?: string
          total_storage_bytes?: number
        }
        Relationships: []
      }
      subscription_analytics: {
        Row: {
          cancelled_subscriptions: number | null
          churn_rate: number | null
          created_at: string
          date: string
          id: string
          mrr_cents: number | null
          new_subscriptions: number | null
          revenue_cents: number | null
        }
        Insert: {
          cancelled_subscriptions?: number | null
          churn_rate?: number | null
          created_at?: string
          date: string
          id?: string
          mrr_cents?: number | null
          new_subscriptions?: number | null
          revenue_cents?: number | null
        }
        Update: {
          cancelled_subscriptions?: number | null
          churn_rate?: number | null
          created_at?: string
          date?: string
          id?: string
          mrr_cents?: number | null
          new_subscriptions?: number | null
          revenue_cents?: number | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_id: string | null
          status: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          trial_end: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_id?: string | null
          status?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          trial_end?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "service_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      user_cohorts: {
        Row: {
          cohort_month: string
          created_at: string
          id: string
          last_active_at: string | null
          user_id: string
          weeks_retained: number | null
        }
        Insert: {
          cohort_month: string
          created_at?: string
          id?: string
          last_active_at?: string | null
          user_id: string
          weeks_retained?: number | null
        }
        Update: {
          cohort_month?: string
          created_at?: string
          id?: string
          last_active_at?: string | null
          user_id?: string
          weeks_retained?: number | null
        }
        Relationships: []
      }
      user_courses: {
        Row: {
          completed_lessons: string[] | null
          course_id: string
          enrolled_at: string
          id: string
          last_accessed_at: string | null
          progress_percentage: number | null
          user_id: string
        }
        Insert: {
          completed_lessons?: string[] | null
          course_id: string
          enrolled_at?: string
          id?: string
          last_accessed_at?: string | null
          progress_percentage?: number | null
          user_id: string
        }
        Update: {
          completed_lessons?: string[] | null
          course_id?: string
          enrolled_at?: string
          id?: string
          last_accessed_at?: string | null
          progress_percentage?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      video_metadata: {
        Row: {
          course_id: string | null
          created_at: string
          duration_seconds: number | null
          file_hash: string
          file_size_bytes: number
          format: string
          id: string
          lesson_id: string | null
          original_filename: string
          primary_project: string
          project_urls: Json
          resolution: string | null
          updated_at: string
          upload_status: string
          user_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          duration_seconds?: number | null
          file_hash: string
          file_size_bytes: number
          format: string
          id?: string
          lesson_id?: string | null
          original_filename: string
          primary_project: string
          project_urls?: Json
          resolution?: string | null
          updated_at?: string
          upload_status?: string
          user_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string
          duration_seconds?: number | null
          file_hash?: string
          file_size_bytes?: number
          format?: string
          id?: string
          lesson_id?: string | null
          original_filename?: string
          primary_project?: string
          project_urls?: Json
          resolution?: string | null
          updated_at?: string
          upload_status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "video_metadata_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "video_metadata_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_inactive_users: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_database_stats: {
        Args: Record<PropertyKey, never>
        Returns: {
          connection_count: number
          database_size_bytes: number
          table_count: number
        }[]
      }
      get_public_profile_data: {
        Args: { profile_user_id: string }
        Returns: {
          avatar_url: string
          bio: string
          created_at: string
          display_name: string
          user_id: string
        }[]
      }
      subscribe_to_newsletter: {
        Args: { subscription_email: string; subscription_source?: string }
        Returns: string
      }
      trigger_analytics_monitor: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      update_user_online_status: {
        Args: { is_online: boolean; user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
