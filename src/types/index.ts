export type Template = {
  id: string;
  name: string;
  language_code: string;
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'disabled' | 'removed';
  content: string;
  parameter_count: number;
  business_account_id?: string;
  whatsapp_config_ids?: string[];
  components?: TemplateComponent[];
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  // Backward compatibility
  language?: string;
};

export type TemplateComponent = {
  type: string;
  format?: string;
  text?: string;
  example?: {
    header_text?: string[];
    body_text?: string[][];
  };
  buttons?: TemplateButton[];
};

export type TemplateButton = {
  type: string;
  text?: string;
  url?: string;
  phone_number?: string;
  example?: string[];
};

export type CSVRow = {
  phoneNumber: string;
  params: string[];
};

export type BulkSendRequest = {
  templateName: string;
  language: string;
  rows: CSVRow[];
};

export type MessageStats = {
  totalSent: number;
  delivered: number;
  read: number;
  failed: number;
  pending: number;
};

export type SendResult = {
  phoneNumber: string;
  success: boolean;
  messageId?: string;
  error?: string;
};

// Broadcast API types
export type BasicWhatsappTemplate = {
  id: string;
  name: string;
  language_code: string;
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  status: 'approved' | 'pending' | 'rejected';
};

export type WhatsappBroadcastStats = {
  total: number;
  sent: number;
  failed: number;
  delivered: number;
  read: number;
  responded: number;
  pending: number;
};

export type WhatsappBroadcast = {
  id: string;
  name: string;
  status: 'draft' | 'sending' | 'completed' | 'failed';
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
  whatsapp_config_id: string;
  whatsapp_template: BasicWhatsappTemplate;
  total_recipients: number;
  sent_count: number;
  failed_count: number;
  delivered_count: number;
  read_count: number;
  responded_count: number;
  pending_count: number;
  response_rate: number;
  stats: WhatsappBroadcastStats;
};

export type WhatsappBroadcastRecipient = {
  id: string;
  phone_number: string;
  status: 'pending' | 'sent' | 'failed';
  sent_at: string | null;
  failed_at: string | null;
  delivered_at: string | null;
  read_at: string | null;
  responded_at: string | null;
  error_message: string | null;
  error_details: Record<string, unknown> | null;
  template_parameters: string[] | Record<string, string>;
  created_at: string;
  updated_at: string;
};

export type RecipientBatchResponse = {
  added: number;
  duplicates: number;
  errors: string[];
};

export type PaginationMeta = {
  page: number;
  per_page: number;
  total_pages: number;
  total_count: number;
};

export type CreateBroadcastRequest = {
  whatsapp_broadcast: {
    name: string;
    whatsapp_config_id: string;
    whatsapp_template_id: string;
  };
};

export type AddRecipientsRequest = {
  recipients: Array<{
    phone_number?: string;
    whatsapp_contact_id?: string;
    template_parameters?: string[] | Record<string, string>;
  }>;
};
