import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { changePassword } from './changePassword.dto';
import { admin, transportista } from 'src/utils/preloadUsers';
import { Role } from 'src/roles/roles.enum';
import { EmailRepository } from 'src/mails/emails.repository';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(forwardRef(() => EmailRepository))
    private readonly emailRepository: EmailRepository,
  ) { }

  async getUsers(page: number, limit: number) {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Page and limit must be greater than 0.');
    }

    const skip = (page - 1) * limit;
    const users = await this.usersRepository.find({
      where: { isDeleted: false },
      take: limit,
      skip: skip,
    },
    )
    return users.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id, isDeleted: false },
      relations: {
        orders: {
          shipments: {
            locality_origin: true,
            locality_destination: true,
          },
          receipt: true,
        },
      },
    });
    if (!user)
      throw new NotFoundException(`User with id: ( ${id} ) not found.`);
    const { password, ...userNoPassword } = user;

    return userNoPassword;
  }

  async createUser(user: Partial<User>): Promise<Partial<User>> {
    const newUser = await this.usersRepository.save(user);

    const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });

    const { password, ...userNoPasswords } = dbUser;

    return userNoPasswords;
  }

  async updateUser(id: string, user: User): Promise<Partial<User>> {
    const foundUser = await this.usersRepository.findOne({where: { id, isDeleted: false }});
    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    const { password, ...userNoPasswords } = updatedUser;
    await this.emailRepository.sendEmailUpdateUser(id);
    return userNoPasswords;
  }

  async updatePasswordUser(
    id: string,
    data: changePassword,
  ): Promise<Partial<User>> {
    const { oldPassword, newPassword } = data;

    const foundUser = await this.usersRepository.findOne({where: { id, isDeleted: false }});
    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const validPassword = await bcrypt.compare(oldPassword, foundUser.password);

    if (!validPassword) throw new UnauthorizedException('Invalid credential');

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    foundUser.password = hashedPassword;
    await this.usersRepository.save(foundUser);

    const { password, ...userNoPasswords } = foundUser;

    await this.emailRepository.sendEmailUpdateUser(id);

    return userNoPasswords;
  }

  async updateRoleUser(id: string, user: User): Promise<Partial<User>> {
    const foundUser = await this.usersRepository.findOne({where: { id, isDeleted: false }});
    if (!foundUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    const { password, ...userNoPasswords } = updatedUser;

    return userNoPasswords;
  }
  async getUserByEmail(email: string) {
    return await this.usersRepository.findOne({where: { email, isDeleted: false }});;
  }
  async preload() {
    const users = await this.usersRepository.find();

    if (!users.length) {
      const adminUser = await this.usersRepository.create(admin);
      const hashedPasswordA = await bcrypt.hash(adminUser.password, 10);
      adminUser.password = hashedPasswordA;
      adminUser.role = Role.Admin;
      await this.usersRepository.save(adminUser);
      console.log('Admin created successfully');

      const transportistaUser =
        await this.usersRepository.create(transportista);
      const hashedPasswordT = await bcrypt.hash(transportistaUser.password, 10);
      transportistaUser.password = hashedPasswordT;
      transportistaUser.role = Role.Transporte;
      await this.usersRepository.save(transportistaUser);
      console.log('Transportista created successfully');
    } else {
      return null;
    }
  }

  async getAllUsers() {
    const users = await this.usersRepository.find();
    return users;
  }

  async deleteUser(id: string) {
    const foundUser = await this.usersRepository.findOne({where: { id, isDeleted: false }});
    if (!foundUser) throw new NotFoundException(`User with id:${id} not found`)

    foundUser.isDeleted = true;
    await this.usersRepository.save(foundUser);
    return foundUser;
  }
}
