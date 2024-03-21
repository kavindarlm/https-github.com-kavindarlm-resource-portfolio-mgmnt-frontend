import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { SprintService } from "./sprint.service";
import { CreateSprintDto } from "./dtos/create-sprint.dto";

@Controller('sprint')
export class SprintController{
    constructor(private readonly sprintService:
    SprintService){}


    @Post()
    create(@Body() dto: CreateSprintDto){
        return this.sprintService.create(dto);
    }

    @Get()
    findMany(){
        return this.sprintService.findMany();
    }

    @Put(':id')
    update(@Param('id') id: number ,@Body() dto: CreateSprintDto){
        return this.sprintService.update(id,dto);
    }

    @Delete(':id')
    delete(@Param('id') id: number){
        return this.sprintService.delete(id);
    }

}