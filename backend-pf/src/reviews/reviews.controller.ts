import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReviewDto } from './reviews.dto';
import { ReviewsService } from './reviews.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/roles/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('reviews')
@ApiTags('Reviews')
@ApiBearerAuth()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las Reviews, comentarios y rating',
  })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async getReviews() {
    return await this.reviewsService.getReviews();
  }

  @Post('/new/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Subir una reseña con id de usuario' })
  async createReview(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() review: ReviewDto,
  ) {
    return await this.reviewsService.createReview(id, review);
  }

  @Get('/rating')
  @ApiOperation({ summary: 'Obtener promedio de rating de Reviews' })
  async getRating() {
    return await this.reviewsService.getRating();
  }
}
