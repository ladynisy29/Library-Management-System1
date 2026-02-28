import { createFileRoute, Outlet } from '@tanstack/react-router'

const AuthorsLayout = (): React.JSX.Element => <Outlet />

export const Route = createFileRoute('/authors')({
  component: AuthorsLayout,
})
