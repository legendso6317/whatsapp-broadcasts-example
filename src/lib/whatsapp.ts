import { WhatsAppClient } from '@kapso/whatsapp-cloud-api';

if (!process.env.KAPSO_API_KEY) {
  throw new Error('KAPSO_API_KEY is not set');
}

if (!process.env.PHONE_NUMBER_ID) {
  throw new Error('PHONE_NUMBER_ID is not set');
}

export const whatsappClient = new WhatsAppClient({
  accessToken: process.env.WHATSAPP_TOKEN!,
});

export const phoneNumberId = process.env.PHONE_NUMBER_ID;
