import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('HandsomeMan') private readonly handsomeMan: any,
    @Inject('MESSAGE_BOX') private readonly messageBox: any,
    @Inject('SAME_AS_MESSAGE_BOX') private readonly sameAsMessageBox: any,
  ) {
    console.log(this.handsomeMan);
    console.log(this.messageBox);
    console.log(this.sameAsMessageBox === this.messageBox); // 進行比對
  }

  @Get()
  @UseFilters(HttpExceptionFilter)
  getHello(): string {
    // throw new HttpException(`test`, HttpStatus.BAD_REQUEST);
    return this.appService.getHello();
  }
}
