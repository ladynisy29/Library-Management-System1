import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsUrl()
  @IsOptional()
  pictureUrl?: string;
}

export class UpdateAuthorDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsUrl()
  @IsOptional()
  pictureUrl?: string;
}
