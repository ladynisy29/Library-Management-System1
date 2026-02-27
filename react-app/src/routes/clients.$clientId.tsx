import { createFileRoute } from '@tanstack/react-router'
import { ClientDetailsPage } from '../clients/pages/ClientDetailsPage'

export const Route = createFileRoute('/clients/$clientId')({
  component: ClientDetailsRoute,
})

function ClientDetailsRoute() {
  const { clientId } = Route.useParams()

  return <ClientDetailsPage clientId={clientId} />
}
