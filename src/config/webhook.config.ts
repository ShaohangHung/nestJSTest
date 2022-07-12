import { registerAs } from '@nestjs/config';

export default registerAs(
  'webhook',
  (): Record<string, any> => ({
    verifyToken: process.env.VERIFY_TOKEN,
    facebookPageId: process.env.FACEBOOK_PAGE_ID,
    fbPageAccessToken: process.env.FB_PAGE_ACCESS_TOKEN,
    whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
    whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN,
  }),
);
