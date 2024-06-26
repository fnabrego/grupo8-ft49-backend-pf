import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { LocalitiesService } from './localities.service';
import { LocalityDto } from './localities.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Localities')
@Controller('localities')
export class LocalitiesController {
  constructor(private readonly localitiesService: LocalitiesService) {}

  @Get()
  async getLocalities() {
    return await this.localitiesService.getLocalities();
  }

  @Post('add')
  async postLocalities(@Body() data: LocalityDto) {
    return await this.localitiesService.postLocalities(data);
  }

  @Put(':id')
  async putLocalities(@Param('id') id: number, @Body() data: LocalityDto) {
    return await this.localitiesService.putLocalities(id, data);
  }

  @Delete(':id')
  async deleteLocalities(@Param('id') id: number) {
    return await this.localitiesService.deleteLocalities(id);
  }
}
