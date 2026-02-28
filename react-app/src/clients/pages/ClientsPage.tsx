import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { SearchOutlined } from '@ant-design/icons'
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Typography,
} from 'antd'
import type { ClientModel } from '../ClientModel'
import { useClientProvider } from '../providers/useClientProvider'

export function ClientsPage(): React.JSX.Element {
  const { clients, loadClients, createClient, deleteClient } =
    useClientProvider()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)
  const [deleteClientId, setDeleteClientId] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [pictureUrl, setPictureUrl] = useState<string>('')

  const normalizedSearchQuery: string = searchQuery.trim().toLowerCase()
  const filteredClients: ClientModel[] = clients.filter(
    (client: ClientModel): boolean => {
      if (normalizedSearchQuery.length === 0) {
        return true
      }

      const fullName: string =
        `${client.firstName} ${client.lastName}`.toLowerCase()
      const normalizedEmail: string = (client.email ?? '').toLowerCase()

      return (
        fullName.includes(normalizedSearchQuery) ||
        normalizedEmail.includes(normalizedSearchQuery)
      )
    },
  )

  useEffect(() => {
    loadClients()
  }, [loadClients])

  return (
    <Space direction="vertical" style={{ width: '100%', textAlign: 'left' }}>
      <Breadcrumb items={[{ title: 'Clients' }]} />
      <Typography.Title level={2}>Clients</Typography.Title>
      <Input.Search
        allowClear
        prefix={<SearchOutlined />}
        size="large"
        style={{ maxWidth: 420 }}
        placeholder="Search clients by name or email"
        value={searchQuery}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setSearchQuery(event.target.value)
        }}
      />
      <Button type="primary" onClick={() => setIsCreateOpen(true)}>
        Create client
      </Button>
      <Table
        rowKey="id"
        dataSource={filteredClients}
        locale={{
          emptyText:
            normalizedSearchQuery.length > 0
              ? 'No clients match your search.'
              : 'No clients found.',
        }}
        columns={[
          {
            title: 'Name',
            render: (_, row: ClientModel) => (
              <Link to="/clients/$clientId" params={{ clientId: row.id }}>
                {row.firstName} {row.lastName}
              </Link>
            ),
          },
          {
            title: 'Books bought',
            dataIndex: 'booksBoughtCount',
          },
          {
            title: 'Actions',
            render: (_, row: ClientModel) => (
              <Button danger onClick={() => setDeleteClientId(row.id)}>
                Delete
              </Button>
            ),
          },
        ]}
      />

      <Modal
        title="Create client"
        open={isCreateOpen}
        onCancel={() => setIsCreateOpen(false)}
        onOk={() => {
          createClient({
            firstName,
            lastName,
            email: email.length > 0 ? email : undefined,
            pictureUrl: pictureUrl.length > 0 ? pictureUrl : undefined,
          }).then(() => {
            setFirstName('')
            setLastName('')
            setEmail('')
            setPictureUrl('')
            setIsCreateOpen(false)
          })
        }}
        okButtonProps={{
          disabled: firstName.length === 0 || lastName.length === 0,
        }}
      >
        <Form layout="vertical">
          <Form.Item label="First name">
            <Input
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Last name">
            <Input
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item label="Picture URL">
            <Input
              value={pictureUrl}
              onChange={e => setPictureUrl(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete this client?"
        open={deleteClientId.length > 0}
        onCancel={() => setDeleteClientId('')}
        onOk={() => {
          deleteClient(deleteClientId).then(() => {
            setDeleteClientId('')
          })
        }}
      >
        This action cannot be undone.
      </Modal>
    </Space>
  )
}
