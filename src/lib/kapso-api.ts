import type {
  CreateBroadcastRequest,
  AddRecipientsRequest,
  WhatsappBroadcast,
  WhatsappBroadcastRecipient,
  RecipientBatchResponse,
  PaginationMeta,
  Template,
} from '@/types';

const KAPSO_API_BASE = 'https://app.kapso.ai/api/v1';

if (!process.env.KAPSO_API_KEY) {
  throw new Error('KAPSO_API_KEY is not set');
}

type KapsoApiOptions<T = unknown> = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: T;
  params?: Record<string, string | number>;
};

type ApiResponse<T> = {
  data: T;
};

type ApiListResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};

async function kapsoFetch<T = unknown, B = unknown>(
  endpoint: string,
  options: KapsoApiOptions<B> = {}
): Promise<T> {
  const { method = 'GET', body, params } = options;

  let url = `${KAPSO_API_BASE}${endpoint}`;

  if (params) {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const headers: HeadersInit = {
    'X-API-Key': process.env.KAPSO_API_KEY!,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(errorData.error || `API request failed with status ${response.status}`);
  }

  return response.json();
}

export const kapsoApi = {
  broadcasts: {
    create: (data: CreateBroadcastRequest) =>
      kapsoFetch<ApiResponse<WhatsappBroadcast>, CreateBroadcastRequest>('/whatsapp_broadcasts', {
        method: 'POST',
        body: data,
      }),
    get: (broadcastId: string) =>
      kapsoFetch<ApiResponse<WhatsappBroadcast>>(`/whatsapp_broadcasts/${broadcastId}`),
    list: () => kapsoFetch<ApiListResponse<WhatsappBroadcast>>('/whatsapp_broadcasts'),
    addRecipients: (broadcastId: string, data: AddRecipientsRequest) =>
      kapsoFetch<ApiResponse<RecipientBatchResponse>, AddRecipientsRequest>(
        `/whatsapp_broadcasts/${broadcastId}/recipients`,
        { method: 'POST', body: data }
      ),
    getRecipients: (broadcastId: string, page: number = 1, perPage: number = 20) =>
      kapsoFetch<ApiListResponse<WhatsappBroadcastRecipient>>(
        `/whatsapp_broadcasts/${broadcastId}/recipients`,
        { params: { page, per_page: perPage } }
      ),
    send: (broadcastId: string) =>
      kapsoFetch<ApiResponse<WhatsappBroadcast>>(`/whatsapp_broadcasts/${broadcastId}/send`, {
        method: 'POST',
      }),
  },
  templates: {
    list: (params?: Record<string, string | number>) =>
      kapsoFetch<ApiListResponse<Template>>('/whatsapp_templates', { params }),
    get: (templateId: string) =>
      kapsoFetch<ApiResponse<Template>>(`/whatsapp_templates/${templateId}`),
  },
};
