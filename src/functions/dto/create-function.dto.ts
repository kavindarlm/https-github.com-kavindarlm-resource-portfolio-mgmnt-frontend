import { IsNotEmpty } from "class-validator";


export class CreateFunctionDto {
    @IsNotEmpty({message: 'Function name is required'})
    function_name: string;
}
