import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './create-cat.dto';

@Controller(`cats`)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @HttpCode(200)
  getAllCats(): string {
    return this.catsService.getAllCats();
  }

  @Post()
  @HttpCode(404)
  @Header('Cache-Control', 'none')
  @Header('Cache-Control', 'application/json')
  create(@Body() createCatDto: CreateCatDto): any {
    console.log(createCatDto);
    return { message: 'This action adds a new cat' };
  }

  @Get(`redirect`)
  @Redirect('https://nestjs.com', 301)
  redirect(@Query('version') version): any {
    console.log(version);
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get(`:id`)
  getOneCat(
    @Param() params,
    @Query() query,
    @Param('id') id: string,
    @Query('nation') nation,
  ): string {
    console.log(params);
    console.log(query);
    console.log(id);
    console.log(nation);
    return this.catsService.getCatById(params.id, query.nation);
  }
}
