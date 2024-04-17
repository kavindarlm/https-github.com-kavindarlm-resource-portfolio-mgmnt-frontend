import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersFunctionDto } from './create-users_function.dto';

export class UpdateUsersFunctionDto extends PartialType(CreateUsersFunctionDto) {
    user_id: number;
    functionIds: number[];
}
