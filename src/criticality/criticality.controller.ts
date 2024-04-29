import { Controller, Get} from '@nestjs/common';
import { CriticalityService } from './criticality.service';
// import { CreateCriticalityDto } from './dto/create-criticality.dto';
// import { UpdateCriticalityDto } from './dto/update-criticality.dto';

@Controller('criticality')
export class CriticalityController {
  constructor(private readonly criticalityService: CriticalityService) {}

  @Get()
  getCriticality(){
    return this.criticalityService.getCriticality();
  }
  // @Post()
  // create(@Body() createCriticalityDto: CreateCriticalityDto) {
  //   return this.criticalityService.create(createCriticalityDto);
  // }

  // @Get()
  // findAll() {
  //   return this.criticalityService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.criticalityService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCriticalityDto: UpdateCriticalityDto) {
  //   return this.criticalityService.update(+id, updateCriticalityDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.criticalityService.remove(+id);
  // }
}
