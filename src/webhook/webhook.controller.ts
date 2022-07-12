import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FacebookService } from 'src/facebook/facebook.service';
import { WhatsappService } from 'src/whatsapp/whatsapp.service';
import { GetWebhookDto } from './dto/get-webhook.dto';
import { PostWebhookDto } from './dto/post-webhook.dto';

@Controller('webhook')
export class WebhookController {
  // Your verify token. Should be a random string.
  private readonly verifyToken: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly facebookService: FacebookService,
    private readonly whatsappService: WhatsappService,
  ) {
    this.verifyToken = configService.get('webhook.verifyToken');
  }
  @ApiOperation({
    summary: 'Creates the endpoint for our webhook',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'EVENT_RECEIVED',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'event is not from a page subscription',
  })
  @Post(``)
  async receiveMsg(@Body() body: PostWebhookDto, @Res() res) {
    if (body.object === 'page') {
      // Iterates over each entry - there may be multiple if batched
      await Promise.all(
        body.entry.map(async (entry) => {
          // Gets the message. entry.messaging is an array, but
          // will only ever contain one message, so we get index 0
          const pageId = entry.id;
          const messageInfo = entry.messaging[0];
          const senderId = messageInfo.sender.id;
          const textMsg = messageInfo.message.text;
          console.log(`pageId=${pageId}`);
          console.log(`senderId=${senderId}`);
          console.log(`textMsg=${textMsg}`);

          const replyTextMsg = `Hi, I've received your message.\nYour message is "${textMsg}"`;
          await this.facebookService.sendMessageToFB(senderId, replyTextMsg);
        }),
      );
      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else if (body.object === 'whatsapp_business_account') {
      // Iterates over each entry - there may be multiple if batched
      await Promise.all(
        body.entry.map(async (entry) => {
          const changes = entry.changes;
          await Promise.all(
            changes.map(async (change) => {
              if (change.value.messages) {
                // const businessPhoneNumber =
                //   change.value.metadata.display_phone_number;
                const businessPhoneNumberId =
                  change.value.metadata.phone_number_id;
                const message = change.value.messages[0];
                const userPhoneNumber = message.from;
                const textMsg = message.text.body;

                console.log(`businessPhoneNumberId=${businessPhoneNumberId}`);
                console.log(`userPhoneNumber=${userPhoneNumber}`);
                console.log(`textMsg=${textMsg}`);

                const replyTextMsg = `Hi, I've received your message.\nYour message is "${textMsg}"`;
                await this.whatsappService.sendMessageToWhatsapp(
                  businessPhoneNumberId,
                  userPhoneNumber,
                  replyTextMsg,
                );
              }
            }),
          );
        }),
      );

      // Returns a '200 OK' response to all requests
      res.status(200).send('EVENT_RECEIVED');
    } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  }

  @ApiOperation({
    summary: 'Adds support for GET requests to our webhook',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'WEBHOOK_VERIFIED',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'verify tokens do not match',
  })
  @Get(``)
  async verify(@Query() query: GetWebhookDto, @Res() res) {
    // Parse the query params
    const mode = query['hub.mode'];
    const token = query['hub.verify_token'];
    const challenge = query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === this.verifyToken) {
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
  }
}
