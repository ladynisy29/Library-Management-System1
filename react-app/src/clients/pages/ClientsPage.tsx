import { useEffect, useState } from 'react'
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

export function ClientsPage() {
  const { clients, loadClients, createClient, deleteClient } =
    useClientProvider()
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)
  const [deleteClientId, setDeleteClientId] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [pictureUrl, setPictureUrl] = useState<string>('')

  useEffect(() => {
    loadClients()
  }, [loadClients])

  return (
    <Space direction="vertical" style={{ width: '100%', textAlign: 'left' }}>
      <Breadcrumb items={[{ title: 'Clients' }]} />
      <Typography.Title level={2}>Clients</Typography.Title>
      <Button type="primary" onClick={() => setIsCreateOpen(true)}>
        Create client
      </Button>
      <Table
        rowKey="id"
        dataSource={clients}
        columns={[
          {
            title: 'Name',
            render: (_, row: ClientModel) => (
              <a href={`/clients/${row.id}`}>
                {row.firstName} {row.lastName}
              </a>
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
