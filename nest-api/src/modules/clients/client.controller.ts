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
import { CreateClientDto, UpdateClientDto } from './client.dto';
import {
  ClientDetailsModel,
  ClientListItemModel,
  ClientModel,
} from './client.model';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  public async getAllClients(): Promise<ClientListItemModel[]> {
    return this.clientService.getAllClients();
  }

  @Get(':id')
  public async getClientById(
    @Param('id') id: string,
  ): Promise<ClientDetailsModel> {
    const client = await this.clientService.getClientById(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  @Post()
  public async createClient(@Body() input: CreateClientDto): Promise<ClientModel> {
    return this.clientService.createClient(input);
  }

  @Patch(':id')
  public async updateClient(
    @Param('id') id: string,
    @Body() input: UpdateClientDto,
  ): Promise<ClientModel> {
    const client = await this.clientService.updateClient(id, input);
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  @Delete(':id')
  public async deleteClient(@Param('id') id: string): Promise<void> {
    await this.clientService.deleteClient(id);
  }
}
