import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.usersRepository.find({
      take: limit,
      skip: skip,
    });

    return users.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async getUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user) return `User with id: ( ${id} ) not found.`;
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
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    const { password, ...userNoPasswords } = updatedUser;

    return userNoPasswords;
  }

  async updateRoleUser(id: string, user: User): Promise<Partial<User>> {
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    const { password, ...userNoPasswords } = updatedUser;

    return userNoPasswords;
  }
  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
