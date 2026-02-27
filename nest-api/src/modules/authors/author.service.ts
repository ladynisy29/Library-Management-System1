import { Injectable } from '@nestjs/common';
import {
  AuthorDetailsModel,
  AuthorListItemModel,
  AuthorModel,
  CreateAuthorModel,
  UpdateAuthorModel,
} from './author.model';
import { AuthorRepository } from './author.repository';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async getAllAuthors(): Promise<AuthorListItemModel[]> {
    return this.authorRepository.getAllAuthors();
  }

  public async getAuthorById(id: string): Promise<AuthorDetailsModel | null> {
    return this.authorRepository.getAuthorById(id);
  }

  public async createAuthor(author: CreateAuthorModel): Promise<AuthorModel> {
    return this.authorRepository.createAuthor(author);
  }

  public async updateAuthor(
    id: string,
    author: UpdateAuthorModel,
  ): Promise<AuthorModel | null> {
    return this.authorRepository.updateAuthor(id, author);
  }

  public async deleteAuthor(id: string): Promise<void> {
    await this.authorRepository.deleteAuthor(id);
  }
}
