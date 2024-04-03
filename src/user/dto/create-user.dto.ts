import { IsEmail, IsNotEmpty } from "class-validator";


export class CreateUserDto {
    
    @IsNotEmpty({message: 'Name is required'})
    user_name: string;

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail()
    user_email: string;

    password?: string;

}
