import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WhatsappService {
  private readonly phoneNumberId: string;
  private readonly accessToken: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.phoneNumberId = configService.get(`webhook.whatsappPhoneNumberId`);
    this.accessToken = configService.get(`webhook.whatsappAccessToken`);
  }

  async sendMessageToWhatsapp(
    phoneNumberId: string,
    userId: string,
    textMsg: string,
  ) {
    try {
      const requestUrl = `https://graph.facebook.com/v13.0/${phoneNumberId}/messages`;
      const headers = {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      };
      const requestBody = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: userId,
        type: 'text',
        text: {
          preview_url: false,
          body: textMsg,
        },
      };
      await lastValueFrom(
        this.httpService.post(requestUrl, requestBody, {
          headers,
        }),
      );
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e);
    }
  }
}
