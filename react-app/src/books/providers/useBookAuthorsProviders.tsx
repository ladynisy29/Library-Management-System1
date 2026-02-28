import { useCallback, useState } from 'react'
import type { AuthorModel } from '../../authors/AuthorModel'
import { apiClient } from '../../api'

type BookAuthorOption = {
  id: string
  firstName: string
  lastName: string
}

export const useBookAuthorsProviders = () => {
  const [authors, setAuthors] = useState<BookAuthorOption[]>([])

  const loadAuthors = useCallback((): Promise<void> => {
    return apiClient.get<AuthorModel[]>('/authors').then(response => {
      setAuthors(
        response.data.map(
          (author: AuthorModel): BookAuthorOption => ({
            id: author.id,
            firstName: author.firstName,
            lastName: author.lastName,
          }),
        ),
      )
    })
  }, [])

  return { authors, loadAuthors }
}
