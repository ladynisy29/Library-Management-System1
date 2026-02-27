import { useCallback, useState } from 'react'
import type { BookModel, CreateBookModel, UpdateBookModel } from '../BookModel'
import { apiClient } from '../../api'

export const useBookProvider = () => {
  const [books, setBooks] = useState<BookModel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loadBooks = useCallback((): Promise<void> => {
    setIsLoading(true)

    return apiClient
      .get<{ data: BookModel[]; totalCount: number }>('/books')
      .then(response => {
        setBooks(response.data.data)
      })
      .finally(() => setIsLoading(false))
  }, [])

  const createBook = (book: CreateBookModel): Promise<void> => {
    return apiClient.post('/books', book).then(() => loadBooks())
  }

  const updateBook = (id: string, input: UpdateBookModel): Promise<void> => {
    return apiClient.patch(`/books/${id}`, input).then(() => loadBooks())
  }

  const deleteBook = (id: string): Promise<void> => {
    return apiClient.delete(`/books/${id}`).then(() => loadBooks())
  }

  return { books, isLoading, loadBooks, createBook, updateBook, deleteBook }
}
