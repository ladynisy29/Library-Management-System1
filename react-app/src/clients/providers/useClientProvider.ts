import { useCallback, useState } from 'react'
import { apiClient } from '../../api'
import type {
  ClientDetailsModel,
  ClientModel,
  CreateClientModel,
  UpdateClientModel,
} from '../ClientModel'

export const useClientProvider = () => {
  const [clients, setClients] = useState<ClientModel[]>([])
  const [client, setClient] = useState<ClientDetailsModel | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loadClients = useCallback((): Promise<void> => {
    setIsLoading(true)
    return apiClient
      .get<ClientModel[]>('/clients')
      .then(response => setClients(response.data))
      .finally(() => setIsLoading(false))
  }, [])

  const loadClient = useCallback((id: string): Promise<void> => {
    setIsLoading(true)
    return apiClient
      .get<ClientDetailsModel>(`/clients/${id}`)
      .then(response => setClient(response.data))
      .finally(() => setIsLoading(false))
  }, [])

  const createClient = (input: CreateClientModel): Promise<void> => {
    return apiClient.post('/clients', input).then(() => loadClients())
  }

  const updateClient = (
    id: string,
    input: UpdateClientModel,
  ): Promise<void> => {
    return apiClient.patch(`/clients/${id}`, input).then(() => loadClient(id))
  }

  const deleteClient = (id: string): Promise<void> => {
    return apiClient.delete(`/clients/${id}`).then(() => loadClients())
  }

  return {
    clients,
    client,
    isLoading,
    loadClients,
    loadClient,
    createClient,
    updateClient,
    deleteClient,
  }
}
