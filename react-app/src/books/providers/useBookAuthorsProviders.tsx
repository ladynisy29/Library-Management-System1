import { useCallback, useState } from 'react'
import type { BookModel } from '../BookModel'
import { apiClient } from '../../api'

export const useBookAuthorsProviders = () => {
  const [authors, setAuthors] = useState<BookModel['author'][]>([])

  const loadAuthors = useCallback((): Promise<void> => {
    return apiClient.get<BookModel['author'][]>('/authors').then(response => {
      setAuthors(
        response.data.map((author: BookModel['author']) => ({
          id: author.id,
          firstName: author.firstName,
          lastName: author.lastName,
        })),
      )
    })
  }, [])

  return { authors, loadAuthors }
}
