import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { ResFormator } from 'src/shared/api/api-format-class';
import { FacebookMessengerService } from './facebook-messenger.service';

@Controller('facebook-messenger')
export class FacebookMessengerController {
  constructor(
    private readonly facebookMessengerService: FacebookMessengerService,
  ) {}

  @Get(`test`)
  @HttpCode(200)
  async test(@Res() res): Promise<ResFormator> {
    try {
      const result = await this.facebookMessengerService.test();
      return res
        .status(HttpStatus.OK)
        .json(new ResFormator(result).fullResponse);
    } catch (e) {
      console.log(e);
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json(new ResFormator(new Error(e.message)).fullResponse);
    }
  }
}
