import { Controller, Get, Post,Body, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/createquiz.dto';


@Controller('quiz')
export class QuizController {
    constructor(private quizService: QuizService) {}

    @Get('/')
    getallquiz(){
        return this.quizService.getalquiz();
    }

    @Post('/create')
    @HttpCode(200)
    @UsePipes(ValidationPipe)
    createquiz(@Body() quizdata: CreateQuizDto){
        return {'data': quizdata};
    }
}
