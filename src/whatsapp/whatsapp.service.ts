import * as mime from 'mime-types';
import * as fs from 'fs';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { MessageType } from './whatsapp.constant';

@Injectable()
export class WhatsappService {
  private readonly phoneNumberId: string;
  private readonly accessToken: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.phoneNumberId = this.configService.get(
      `webhook.whatsappPhoneNumberId`,
    );
    this.accessToken = this.configService.get(`webhook.whatsappAccessToken`);
  }

  async consumeMsg(entry: any[]) {
    await Promise.all(
      entry.map(async (entry) => {
        const changes = entry.changes;
        await Promise.all(
          changes.map(async (change) => {
            if (change.value.messages) {
              // const businessPhoneNumber =
              //   change.value.metadata.display_phone_number;
              const businessPhoneNumberId =
                change.value.metadata.phone_number_id;
              const message = change.value.messages[0];
              const type = message.type;
              const userPhoneNumber = message.from;
              let textMsg = ``;
              // console.log(message);
              if (type && type === MessageType.TEXT) {
                textMsg = message.text.body;
              } else if (type && type === MessageType.IMAGE) {
                const image = message.image;
                textMsg = image.caption || `image`;
                const fileResult = await this.getFile(image.id);
                fs.writeFileSync(
                  `${image.id}.${mime.extension(image.mime_type)}`,
                  Buffer.from(fileResult.data, 'binary'),
                );
              } else if (type && type === MessageType.DOCUMENT) {
                const document = message.document;
                textMsg = `document`;
                const fileResult = await this.getFile(document.id);
                fs.writeFileSync(
                  `${document.id}.${mime.extension(document.mime_type)}`,
                  Buffer.from(fileResult.data, 'binary'),
                );
              }

              console.log(`businessPhoneNumberId=${businessPhoneNumberId}`);
              console.log(`userPhoneNumber=${userPhoneNumber}`);
              console.log(`textMsg=${textMsg}`);

              const replyTextMsg = `Hi, I've received your message.\nYour message is "${textMsg}"`;
              await this.sendMessageToWhatsapp(
                businessPhoneNumberId,
                userPhoneNumber,
                replyTextMsg,
              );
            }
          }),
        );
      }),
    );
  }

  async getFile(mediaId: string) {
    const requestUrl = `https://graph.facebook.com/v13.0/${mediaId}`;
    const headers = {
      Authorization: `Bearer ${this.accessToken}`,
    };
    const res = await lastValueFrom(
      this.httpService.get(requestUrl, {
        headers,
      }),
    );

    return lastValueFrom(
      this.httpService.get(res.data.url, {
        headers,
        responseType: `arraybuffer`,
      }),
    );
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

  async test() {
    const fileResult = await this.getFile(`579150347264336`);
    console.log(fileResult.data.length);

    // const readBuffer = fs.readFileSync(`./sample.pptx`);
    // console.log(readBuffer.length);
    // fs.writeFileSync(`1.pptx`, readBuffer);
    return ``;
  }
}
