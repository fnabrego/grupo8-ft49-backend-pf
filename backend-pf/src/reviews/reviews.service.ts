import { Injectable } from '@nestjs/common';
import { ReviewDto } from './reviews.dto';
import { ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewsRepository: ReviewsRepository) {}
  async createReview(id: string, review: ReviewDto) {
    return await this.reviewsRepository.createReview(id, review);
  }
  async getRating() {
    return await this.reviewsRepository.getRating();
  }
  async getReviews() {
    return await this.reviewsRepository.getReviews();
  }
}
