import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { LocalitiesService } from './localities.service';
import { LocalityDto } from './localities.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Localities')
@Controller('localities')
export class LocalitiesController {
  constructor(private readonly localitiesService: LocalitiesService) {}

  @Get()
  async getLocalities() {
    return await this.localitiesService.getLocalities();
  }
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('add')
  async postLocalities(@Body() data: LocalityDto) {
    return await this.localitiesService.postLocalities(data);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id')
  async putLocalities(@Param('id') id: number, @Body() data: LocalityDto) {
    return await this.localitiesService.putLocalities(id, data);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async deleteLocalities(@Param('id') id: number) {
    return await this.localitiesService.deleteLocalities(id);
  }
}
