export type AuthorModel = {
  id: string
  firstName: string
  lastName: string
  pictureUrl: string | null
  booksCount: number
}

export type AuthorDetailsModel = {
  id: string
  firstName: string
  lastName: string
  pictureUrl: string | null
  averageSales: number
  books: {
    id: string
    title: string
    yearPublished: number
    pictureUrl: string | null
  }[]
}

export type CreateAuthorModel = {
  firstName: string
  lastName: string
  pictureUrl?: string
}

export type UpdateAuthorModel = Partial<CreateAuthorModel>
