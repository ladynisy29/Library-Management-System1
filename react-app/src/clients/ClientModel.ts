export type ClientModel = {
  id: string
  firstName: string
  lastName: string
  email: string | null
  pictureUrl: string | null
  booksBoughtCount: number
}

export type ClientDetailsModel = {
  id: string
  firstName: string
  lastName: string
  email: string | null
  pictureUrl: string | null
  sales: {
    bookId: string
    bookTitle: string
    authorName: string
    soldAt: string
  }[]
}

export type CreateClientModel = {
  firstName: string
  lastName: string
  email?: string
  pictureUrl?: string
}

export type UpdateClientModel = Partial<CreateClientModel>
