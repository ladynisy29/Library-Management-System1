import { Injectable } from '@nestjs/common';
import {
  ClientDetailsModel,
  ClientListItemModel,
  ClientModel,
  CreateClientModel,
  UpdateClientModel,
} from './client.model';
import { ClientRepository } from './client.repository';

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  public async getAllClients(): Promise<ClientListItemModel[]> {
    return this.clientRepository.getAllClients();
  }

  public async getClientById(id: string): Promise<ClientDetailsModel | null> {
    return this.clientRepository.getClientById(id);
  }

  public async createClient(input: CreateClientModel): Promise<ClientModel> {
    return this.clientRepository.createClient(input);
  }

  public async updateClient(
    id: string,
    input: UpdateClientModel,
  ): Promise<ClientModel | null> {
    return this.clientRepository.updateClient(id, input);
  }

  public async deleteClient(id: string): Promise<void> {
    await this.clientRepository.deleteClient(id);
  }
}
