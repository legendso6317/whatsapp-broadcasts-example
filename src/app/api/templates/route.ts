import { NextResponse } from 'next/server';
import { kapsoApi } from '@/lib/kapso-api';

export async function GET() {
  try {
    const whatsappConfigId = process.env.WHATSAPP_CONFIG_ID;

    if (!whatsappConfigId) {
      return NextResponse.json(
        { error: 'WHATSAPP_CONFIG_ID not set in environment variables' },
        { status: 500 }
      );
    }

    // Fetch templates from Kapso API filtered by config and approved status
    const templates = await kapsoApi.templates.list({
      whatsapp_config_id: whatsappConfigId,
      'q[status_eq]': 'approved',
      per_page: 100,
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}
