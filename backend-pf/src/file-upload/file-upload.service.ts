import { Injectable, NotFoundException } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly fileUploadRepository: FileUploadRepository,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async uploadImage(file: Express.Multer.File, id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ${id} has not been found`);
    }

    const uploadedImage = await this.fileUploadRepository.uploadImage(file);

    await this.usersRepository.update(id, {
      profilePicture: uploadedImage.secure_url,
    });

    const updatedUser = await this.usersRepository.findOneBy({ id });

    const { password, ...userNoPassword } = updatedUser;

    return userNoPassword;
  }
}
