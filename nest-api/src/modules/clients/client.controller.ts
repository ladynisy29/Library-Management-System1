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
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  public async getAllClients() {
    return this.clientService.getAllClients();
  }

  @Get(':id')
  public async getClientById(@Param('id') id: string) {
    const client = await this.clientService.getClientById(id);
    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return client;
  }

  @Post()
  public async createClient(@Body() input: CreateClientDto) {
    return this.clientService.createClient(input);
  }

  @Patch(':id')
  public async updateClient(
    @Param('id') id: string,
    @Body() input: UpdateClientDto,
  ) {
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
