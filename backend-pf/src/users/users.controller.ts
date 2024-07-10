import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './users.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles/roles.enum';
import { RoleDto } from 'src/roles/roles.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { changePassword } from './changePassword.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 2) {
    if (page && limit) return this.userService.getUsers(page, limit);

    return this.userService.getUsers(page, limit);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUser(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, user);
  }

  @Put('changepassword/:id')
  @UseGuards(AuthGuard)
  updatePasswordUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: changePassword,
  ) {
    return this.userService.updatePasswordUser(id, data);
  }

  @Put('role/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  updateRoleUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: RoleDto,
  ) {
    return this.userService.updateUser(id, user);
  }
}
