import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'resource - portfolio - management - backend- successfully connected';
  }
}
