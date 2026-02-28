import { createFileRoute } from '@tanstack/react-router'
import { ClientDetailsPage } from '../clients/pages/ClientDetailsPage'

export const Route = createFileRoute('/clients/$clientId')({
  component: ClientDetailsRoute,
})

function ClientDetailsRoute(): React.JSX.Element {
  const { clientId } = Route.useParams()

  return <ClientDetailsPage clientId={clientId} />
}
