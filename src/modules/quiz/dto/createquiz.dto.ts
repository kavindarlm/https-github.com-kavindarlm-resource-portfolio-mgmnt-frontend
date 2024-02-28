import { IsNotEmpty,IsEmail,MinLength } from 'class-validator';

export class CreateQuizDto{
    
    @IsNotEmpty({message: 'Title is required'})
    @MinLength(5)
    title: string;

    @IsNotEmpty({message: 'Description is required'})
    @MinLength(5)
    description: string;
}