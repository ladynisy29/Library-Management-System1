import { createFileRoute, Outlet } from '@tanstack/react-router'

const BooksLayout = (): React.JSX.Element => <Outlet />

export const Route = createFileRoute('/books')({
  component: BooksLayout,
})
