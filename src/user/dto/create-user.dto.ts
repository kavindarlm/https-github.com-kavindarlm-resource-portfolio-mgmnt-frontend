import { IsEmail, IsNotEmpty } from "class-validator";


// const generatePassword = (length: number, chars: string): string => {
//     let password = "";
//     for (let i = 0; i < length; i++) {
//       password += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return password;
//   };

export class CreateUserDto {
    
    @IsNotEmpty({message: 'Name is required'})
    user_name: string;

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail()
    user_email: string;

    password?: string;

    
    // password: string = generatePassword(8, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789');

}
