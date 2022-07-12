import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class FacebookService {
  private readonly pageId: string;
  private readonly pageAccessToken: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.pageId = configService.get(`webhook.facebookPageId`);
    this.pageAccessToken = configService.get(`webhook.fbPageAccessToken`);
  }

  async sendMessageToFB(recipientId: string, textMsg: string) {
    try {
      const requestUrl = `https://graph.facebook.com/v14.0/me/messages?access_token=${this.pageAccessToken}`;
      const requestBody = {
        messaging_type: 'RESPONSE',
        recipient: {
          id: recipientId,
        },
        message: {
          text: textMsg,
        },
      };
      await lastValueFrom(
        this.httpService.post(requestUrl, requestBody, {
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      );
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e);
    }
  }
}
