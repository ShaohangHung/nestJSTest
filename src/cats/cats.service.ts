import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  getAllCats(): string {
    return 'cats here';
  }

  getCatById(id: string, nation: string): string {
    return `get one cat, id=${id}, nation=${nation}`;
  }
}
