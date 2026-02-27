import { useCallback, useState } from 'react'
import { apiClient } from '../../api'
import type {
  AuthorDetailsModel,
  AuthorModel,
  CreateAuthorModel,
  UpdateAuthorModel,
} from '../AuthorModel'

export const useAuthorProvider = () => {
  const [authors, setAuthors] = useState<AuthorModel[]>([])
  const [author, setAuthor] = useState<AuthorDetailsModel | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loadAuthors = useCallback((): Promise<void> => {
    setIsLoading(true)
    return apiClient
      .get<AuthorModel[]>('/authors')
      .then(response => setAuthors(response.data))
      .finally(() => setIsLoading(false))
  }, [])

  const loadAuthor = useCallback((id: string): Promise<void> => {
    setIsLoading(true)
    return apiClient
      .get<AuthorDetailsModel>(`/authors/${id}`)
      .then(response => setAuthor(response.data))
      .finally(() => setIsLoading(false))
  }, [])

  const createAuthor = (input: CreateAuthorModel): Promise<void> => {
    return apiClient.post('/authors', input).then(() => loadAuthors())
  }

  const updateAuthor = (
    id: string,
    input: UpdateAuthorModel,
  ): Promise<void> => {
    return apiClient.patch(`/authors/${id}`, input).then(() => loadAuthor(id))
  }

  const deleteAuthor = (id: string): Promise<void> => {
    return apiClient.delete(`/authors/${id}`).then(() => loadAuthors())
  }

  return {
    authors,
    author,
    isLoading,
    loadAuthors,
    loadAuthor,
    createAuthor,
    updateAuthor,
    deleteAuthor,
  }
}
