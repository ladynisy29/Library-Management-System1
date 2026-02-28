import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from './author.dto';
import {
  AuthorDetailsModel,
  AuthorListItemModel,
  AuthorModel,
} from './author.model';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAllAuthors(): Promise<AuthorListItemModel[]> {
    return this.authorService.getAllAuthors();
  }

  @Get(':id')
  public async getAuthorById(
    @Param('id') id: string,
  ): Promise<AuthorDetailsModel> {
    const author = await this.authorService.getAuthorById(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }

  @Post()
  public async createAuthor(
    @Body() createAuthorDto: CreateAuthorDto,
  ): Promise<AuthorModel> {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Patch(':id')
  public async updateAuthor(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<AuthorModel> {
    const author = await this.authorService.updateAuthor(id, updateAuthorDto);
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    return author;
  }

  @Delete(':id')
  public async deleteAuthor(@Param('id') id: string): Promise<void> {
    await this.authorService.deleteAuthor(id);
  }
}
