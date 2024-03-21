import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sprint } from "./sprint.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Sprint])]
})
export class SprintModule{

}