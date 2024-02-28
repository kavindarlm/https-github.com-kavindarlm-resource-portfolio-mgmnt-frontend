import { Injectable } from '@nestjs/common';

@Injectable()
export class QuizService {
    getalquiz() {
        return [1, 2 ,6,5];
    }
}