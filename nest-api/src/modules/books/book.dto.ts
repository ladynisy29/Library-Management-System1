import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Max,
  Min,
} from 'class-validator';
import type { AuthorId } from '../authors/author.entity';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsUUID(4)
  authorId: AuthorId;

  @IsInt()
  @Min(1500)
  @Max(2100)
  yearPublished: number;

  @IsUrl()
  @IsOptional()
  pictureUrl?: string;
}

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsUUID(4)
  @IsOptional()
  authorId: AuthorId;

  @IsInt()
  @Min(1500)
  @Max(2100)
  @IsOptional()
  yearPublished: number;

  @IsUrl()
  @IsOptional()
  pictureUrl?: string;
}

export class GetBooksDto {
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  @IsOptional()
  limit?: number;

  @IsInt()
  @Min(0)
  @Type(() => Number)
  @IsOptional()
  offset?: number;

  @IsIn(['title', 'yearPublished'])
  @IsOptional()
  sortField?: 'title' | 'yearPublished';

  @IsIn(['ASC', 'DESC'])
  @IsOptional()
  sortDirection?: 'ASC' | 'DESC';
}

export class RecordSaleDto {
  @IsUUID(4)
  clientId: string;

  @IsISO8601()
  soldAt: string;
}
