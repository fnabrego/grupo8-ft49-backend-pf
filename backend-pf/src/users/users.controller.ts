import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RoleDto } from 'src/roles/roles.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 2) {
    if (page && limit) return this.userService.getUsers(page, limit);

    return this.userService.getUsers(page, limit);
  }
  @Get(':id')
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUser(id);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: CreateUserDto,
  ) {
    return this.userService.updateUser(id, user);
  }

  @Put('role/:id')
  updateRoleUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: RoleDto,
  ) {
    return this.userService.updateUser(id, user);
  }
}
