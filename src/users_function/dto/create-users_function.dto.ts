import { IsNotEmpty } from "class-validator";


export class CreateUsersFunctionDto {
    @IsNotEmpty()
    user_id: number;

    @IsNotEmpty()
    functionIds: number[];
}
