import { IsNotEmpty, IsEmail } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty({message: 'Name is required'})
    user_name: string;

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail()
    user_email: string;

}