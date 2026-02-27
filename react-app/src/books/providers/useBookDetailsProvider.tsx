import { useCallback, useState } from 'react'
import type {
  BookDetailsModel,
  RecordSaleModel,
  UpdateBookModel,
} from '../BookModel'
import { apiClient } from '../../api'

export const useBookDetailsProvider = (id: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [book, setBook] = useState<BookDetailsModel | null>(null)

  const loadBook = useCallback((): Promise<void> => {
    setIsLoading(true)
    return apiClient
      .get<BookDetailsModel>(`/books/${id}`)
      .then(response => setBook(response.data))
      .finally(() => setIsLoading(false))
  }, [id])

  const updateBook = (input: UpdateBookModel): Promise<void> => {
    return apiClient
      .patch<BookDetailsModel>(`/books/${id}`, input)
      .then(() => loadBook())
  }

  const recordSale = (input: RecordSaleModel): Promise<void> => {
    return apiClient
      .post<BookDetailsModel>(`/books/${id}/sales`, input)
      .then(() => loadBook())
  }

  return { isLoading, book, loadBook, updateBook, recordSale }
}
