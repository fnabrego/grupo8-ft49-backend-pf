import { forwardRef, Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './reviews.entity';
import { ReviewsRepository } from './reviews.repository';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/users.entity';
import { EmailRepository } from 'src/mails/emails.repository';
import { UsersModule } from 'src/users/users.module';
import { EmailModule } from 'src/mails/emails.module';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User])],
  providers: [
    ReviewsService,
    ReviewsRepository,
    UsersService,
    UsersRepository,
    EmailRepository,
  ],
  controllers: [ReviewsController],
})
export class ReviewsModule {}
