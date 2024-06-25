import { IsEnum } from 'class-validator';
import { Role } from './roles.enum';

export class RoleDto {
  @IsEnum(Role)
  role: Role;
}
