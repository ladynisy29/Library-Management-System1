import { useEffect } from 'react'
import { Typography } from 'antd'
import { useBookProvider } from '../providers/useBookProvider'
import type { BookModel } from '../BookModel'
import { BookListItem } from './BookListItem'
import { CreateBookModal } from './CreateBookModal'

interface BookListProps {
  searchQuery: string
}

export function BookList({ searchQuery }: BookListProps): React.JSX.Element {
  const { books, loadBooks, deleteBook, updateBook, createBook } =
    useBookProvider()

  const normalizedSearchQuery: string = searchQuery.trim().toLowerCase()

  const filteredBooks: BookModel[] = books.filter((book: BookModel): boolean => {
    if (normalizedSearchQuery.length === 0) {
      return true
    }

    const authorFullName: string =
      `${book.author.firstName} ${book.author.lastName}`.toLowerCase()

    return (
      book.title.toLowerCase().includes(normalizedSearchQuery) ||
      authorFullName.includes(normalizedSearchQuery)
    )
  })

  useEffect(() => {
    loadBooks()
  }, [loadBooks])

  return (
    <>
      <CreateBookModal onCreate={createBook} />
      <div style={{ padding: '0 .5rem' }}>
        {filteredBooks.length === 0 ? (
          <Typography.Text>No books match your search.</Typography.Text>
        ) : (
          filteredBooks.map((book: BookModel): React.JSX.Element => (
            <BookListItem
              key={book.id}
              book={book}
              onDelete={deleteBook}
              onUpdate={updateBook}
            />
          ))
        )}
      </div>
    </>
  )
}
