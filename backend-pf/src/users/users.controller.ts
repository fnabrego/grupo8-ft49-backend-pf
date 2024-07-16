import {
  Body,
  Controller,
  Delete,
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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { changePassword } from './changePassword.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios con paginado' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getUsers(@Query('page') page: number = 1, @Query('limit') limit: number = 2) {
    if (page && limit) return this.userService.getUsers(page, limit);

    return this.userService.getUsers(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por id' })
  @UseGuards(AuthGuard)
  getUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.getUser(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar la informacion de un usuario' })
  @UseGuards(AuthGuard)
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, user);
  }

  @Put('changepassword/:id')
  @ApiOperation({ summary: 'Cambiar la contraseña de un usuario' })
  @UseGuards(AuthGuard)
  updatePasswordUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: changePassword,
  ) {
    return this.userService.updatePasswordUser(id, data);
  }

  @Put('role/:id')
  @ApiOperation({ summary: 'Cambiar el rol de un usuario' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  updateRoleUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: RoleDto,
  ) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar usuario' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin, Role.User)
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.deleteUser(id);
  }
}
