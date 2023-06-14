import { Controller, Header, HttpCode, Post } from '@nestjs/common';
import { XlsxService } from './xlsx.service';

@Controller('xlsx')
export class XlsxController {
  constructor(private readonly xlsxService: XlsxService) {}

  @Post()
  @HttpCode(404)
  @Header('Cache-Control', 'none')
  @Header('Cache-Control', 'application/json')
  async create(): Promise<any> {
    // await this.xlsxService.do20230520();
    await this.xlsxService.do20230614();
    return { message: 'success' };
  }
}
