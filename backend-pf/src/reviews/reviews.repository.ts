import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewDto } from './reviews.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './reviews.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsRepository {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Review) private reviewsRepository: Repository<Review>,
  ) {}
  async createReview(id: string, review: ReviewDto): Promise<Review> {
    const user = await this.usersService.getUser(id);
    if (!user) throw new NotFoundException('User not found');
    const { rating, comment } = review;
    const newReview = await this.reviewsRepository.create({
      user,
      rating,
      comment,
    });
    const saveReview = await this.reviewsRepository.save(newReview);
    return saveReview;
  }
  async getRating() {
    const reviews = await this.reviewsRepository.find();
    if (reviews.length === 0) throw new NotFoundException('Reviews not found');
    let totalRating = 0;
    for (const review of reviews) {
      totalRating += review.rating;
    }
    const average = totalRating / reviews.length;
    return {
      average: average.toFixed(1),
      totalReviews: reviews.length,
    };
  }

  async getReviews() {
    const reviews = await this.reviewsRepository.find({
      relations: {
        user: true,
      },
    });
    if (reviews.length === 0) throw new NotFoundException('No reviews found');
    for (const review of reviews) {
      delete review.user.password;
    }
    return reviews;
  }
}
