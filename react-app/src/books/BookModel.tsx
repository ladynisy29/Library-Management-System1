export type BookModel = {
  id: string
  title: string
  yearPublished: number
  pictureUrl: string | null
  clientsBoughtCount: number
  author: {
    id: string
    firstName: string
    lastName: string
  }
}

export type BookDetailsModel = {
  id: string
  title: string
  yearPublished: number
  pictureUrl: string | null
  author: {
    id: string
    firstName: string
    lastName: string
  }
  clients: {
    clientId: string
    firstName: string
    lastName: string
    soldAt: string
  }[]
}

export type CreateBookModel = {
  authorId: string
  title: string
  yearPublished: number
  pictureUrl?: string
}

export type UpdateBookModel = Partial<CreateBookModel>

export type RecordSaleModel = {
  clientId: string
  soldAt: string
}
