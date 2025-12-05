export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      events: {
        Row: {
          created_at: string | null;
          date: string;
          description: string | null;
          id: string;
          location: string;
          name: string;
          organizer_id: string | null;
          time: string;
          updated_at: string | null;
          venue: string;
        };
        Insert: {
          created_at?: string | null;
          date: string;
          description?: string | null;
          id?: string;
          location: string;
          name: string;
          organizer_id?: string | null;
          time: string;
          updated_at?: string | null;
          venue: string;
        };
        Update: {
          created_at?: string | null;
          date?: string;
          description?: string | null;
          id?: string;
          location?: string;
          name?: string;
          organizer_id?: string | null;
          time?: string;
          updated_at?: string | null;
          venue?: string;
        };
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey";
            columns: ["organizer_id"];
            isOneToOne: false;
            referencedRelation: "organizers";
            referencedColumns: ["id"];
          },
        ];
      };
      organizers: {
        Row: {
          contact_info: string | null;
          created_at: string | null;
          id: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          contact_info?: string | null;
          created_at?: string | null;
          id?: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          contact_info?: string | null;
          created_at?: string | null;
          id?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      registrations: {
        Row: {
          event_id: string | null;
          id: string;
          registered_at: string | null;
          user_id: string | null;
        };
        Insert: {
          event_id?: string | null;
          id?: string;
          registered_at?: string | null;
          user_id?: string | null;
        };
        Update: {
          event_id?: string | null;
          id?: string;
          registered_at?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "registrations_event_id_fkey";
            columns: ["event_id"];
            isOneToOne: false;
            referencedRelation: "events";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "registrations_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      search_events: {
        Args: {
          search_value: string;
        };
        Returns: {
          created_at: string | null;
          date: string;
          description: string | null;
          id: string;
          location: string;
          name: string;
          organizer_id: string | null;
          time: string;
          updated_at: string | null;
          venue: string;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          owner_id: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          owner_id?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          owner_id: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          owner_id?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
        ];
      };
      s3_multipart_uploads: {
        Row: {
          bucket_id: string;
          created_at: string;
          id: string;
          in_progress_size: number;
          key: string;
          owner_id: string | null;
          upload_signature: string;
          version: string;
        };
        Insert: {
          bucket_id: string;
          created_at?: string;
          id: string;
          in_progress_size?: number;
          key: string;
          owner_id?: string | null;
          upload_signature: string;
          version: string;
        };
        Update: {
          bucket_id?: string;
          created_at?: string;
          id?: string;
          in_progress_size?: number;
          key?: string;
          owner_id?: string | null;
          upload_signature?: string;
          version?: string;
        };
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey";
            columns: ["bucket_id"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
        ];
      };
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string;
          created_at: string;
          etag: string;
          id: string;
          key: string;
          owner_id: string | null;
          part_number: number;
          size: number;
          upload_id: string;
          version: string;
        };
        Insert: {
          bucket_id: string;
          created_at?: string;
          etag: string;
          id?: string;
          key: string;
          owner_id?: string | null;
          part_number: number;
          size?: number;
          upload_id: string;
          version: string;
        };
        Update: {
          bucket_id?: string;
          created_at?: string;
          etag?: string;
          id?: string;
          key?: string;
          owner_id?: string | null;
          part_number?: number;
          size?: number;
          upload_id?: string;
          version?: string;
        };
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey";
            columns: ["bucket_id"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey";
            columns: ["upload_id"];
            isOneToOne: false;
            referencedRelation: "s3_multipart_uploads";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: string[];
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string;
          prefix_param: string;
          delimiter_param: string;
          max_keys?: number;
          next_key_token?: string;
          next_upload_token?: string;
        };
        Returns: {
          key: string;
          id: string;
          created_at: string;
        }[];
      };
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string;
          prefix_param: string;
          delimiter_param: string;
          max_keys?: number;
          start_after?: string;
          next_token?: string;
        };
        Returns: {
          name: string;
          id: string;
          metadata: Json;
          updated_at: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;

// Schema: graphql_public
// Functions
export type ArgsGraphql =
  Database["graphql_public"]["Functions"]["graphql"]["Args"];
export type ReturnTypeGraphql =
  Database["graphql_public"]["Functions"]["graphql"]["Returns"];

// Schema: public
// Tables
export type Event = Database["public"]["Tables"]["events"]["Row"];
export type InsertEvent = Database["public"]["Tables"]["events"]["Insert"];
export type UpdateEvent = Database["public"]["Tables"]["events"]["Update"];

export type Organizer = Database["public"]["Tables"]["organizers"]["Row"];
export type InsertOrganizer =
  Database["public"]["Tables"]["organizers"]["Insert"];
export type UpdateOrganizer =
  Database["public"]["Tables"]["organizers"]["Update"];

export type Registration = Database["public"]["Tables"]["registrations"]["Row"];
export type InsertRegistration =
  Database["public"]["Tables"]["registrations"]["Insert"];
export type UpdateRegistration =
  Database["public"]["Tables"]["registrations"]["Update"];

// Schema: storage
// Tables
export type Bucket = Database["storage"]["Tables"]["buckets"]["Row"];
export type InsertBucket = Database["storage"]["Tables"]["buckets"]["Insert"];
export type UpdateBucket = Database["storage"]["Tables"]["buckets"]["Update"];

export type Migration = Database["storage"]["Tables"]["migrations"]["Row"];
export type InsertMigration =
  Database["storage"]["Tables"]["migrations"]["Insert"];
export type UpdateMigration =
  Database["storage"]["Tables"]["migrations"]["Update"];

export type Object = Database["storage"]["Tables"]["objects"]["Row"];
export type InsertObject = Database["storage"]["Tables"]["objects"]["Insert"];
export type UpdateObject = Database["storage"]["Tables"]["objects"]["Update"];

export type S3MultipartUpload =
  Database["storage"]["Tables"]["s3_multipart_uploads"]["Row"];
export type InsertS3MultipartUpload =
  Database["storage"]["Tables"]["s3_multipart_uploads"]["Insert"];
export type UpdateS3MultipartUpload =
  Database["storage"]["Tables"]["s3_multipart_uploads"]["Update"];

export type S3MultipartUploadPart =
  Database["storage"]["Tables"]["s3_multipart_uploads_parts"]["Row"];
export type InsertS3MultipartUploadPart =
  Database["storage"]["Tables"]["s3_multipart_uploads_parts"]["Insert"];
export type UpdateS3MultipartUploadPart =
  Database["storage"]["Tables"]["s3_multipart_uploads_parts"]["Update"];

// Functions
export type ArgsCanInsertObject =
  Database["storage"]["Functions"]["can_insert_object"]["Args"];
export type ReturnTypeCanInsertObject =
  Database["storage"]["Functions"]["can_insert_object"]["Returns"];

export type ArgsExtension =
  Database["storage"]["Functions"]["extension"]["Args"];
export type ReturnTypeExtension =
  Database["storage"]["Functions"]["extension"]["Returns"];

export type ArgsFilename = Database["storage"]["Functions"]["filename"]["Args"];
export type ReturnTypeFilename =
  Database["storage"]["Functions"]["filename"]["Returns"];

export type ArgsFoldername =
  Database["storage"]["Functions"]["foldername"]["Args"];
export type ReturnTypeFoldername =
  Database["storage"]["Functions"]["foldername"]["Returns"];

export type ArgsGetSizeByBucket =
  Database["storage"]["Functions"]["get_size_by_bucket"]["Args"];
export type ReturnTypeGetSizeByBucket =
  Database["storage"]["Functions"]["get_size_by_bucket"]["Returns"];

export type ArgsListMultipartUploadWithDelimiter =
  Database["storage"]["Functions"]["list_multipart_uploads_with_delimiter"]["Args"];
export type ReturnTypeListMultipartUploadWithDelimiter =
  Database["storage"]["Functions"]["list_multipart_uploads_with_delimiter"]["Returns"];

export type ArgsListObjectWithDelimiter =
  Database["storage"]["Functions"]["list_objects_with_delimiter"]["Args"];
export type ReturnTypeListObjectWithDelimiter =
  Database["storage"]["Functions"]["list_objects_with_delimiter"]["Returns"];

export type ArgsSearch = Database["storage"]["Functions"]["search"]["Args"];
export type ReturnTypeSearch =
  Database["storage"]["Functions"]["search"]["Returns"];
  
