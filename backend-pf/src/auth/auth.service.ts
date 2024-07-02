import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/users.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDto): Promise<Partial<User>> {
    const { email, password, dni, cuit_cuil, name, companyName } = user;

    const foundedUser = await this.userRepository.getUserByEmail(email);

    if (foundedUser) throw new BadRequestException('Registered Email');

    if (companyName !== '' && cuit_cuil === '')
      throw new BadRequestException("Please enter your company's CUIT");

    if (companyName === '' && name !== '' && dni === '')
      throw new BadRequestException('Please enter your DNI number');

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.userRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }

  async signIn(email: string, password: string) {
    if (!email || !password) return 'Email y password required';

    const user = await this.userRepository.getUserByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid credential');

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) throw new UnauthorizedException('Invalid credential');

    // Firma del token
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // genera token
    const token = this.jwtService.sign(payload);

    return {
      message: 'Logged in User',
      token,
      userId: user.id,
    };
  }
}
