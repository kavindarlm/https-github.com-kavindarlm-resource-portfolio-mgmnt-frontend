import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'portfolio - management - backend- successfully connected';
  }
}
