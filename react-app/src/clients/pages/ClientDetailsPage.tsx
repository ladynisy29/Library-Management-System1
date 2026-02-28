import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Breadcrumb, Button, Form, Input, Space, Table, Typography } from 'antd'
import type { ClientDetailsModel } from '../ClientModel'
import { useClientProvider } from '../providers/useClientProvider'

interface ClientDetailsPageProps {
  clientId: string
}

export function ClientDetailsPage({
  clientId,
}: ClientDetailsPageProps): React.JSX.Element {
  const { client, loadClient, updateClient } = useClientProvider()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [pictureUrl, setPictureUrl] = useState<string>('')

  useEffect(() => {
    loadClient(clientId)
  }, [clientId, loadClient])

  useEffect(() => {
    if (!client) {
      return
    }

    setFirstName(client.firstName)
    setLastName(client.lastName)
    setEmail(client.email ?? '')
    setPictureUrl(client.pictureUrl ?? '')
  }, [client])

  return (
    <Space direction="vertical" style={{ width: '100%', textAlign: 'left' }}>
      <Breadcrumb
        items={[
          {
            title: <Link to="/clients">Clients</Link>,
          },
          {
            title: client
              ? `${client.firstName} ${client.lastName}`
              : 'Details',
          },
        ]}
      />

      <Typography.Title level={2}>
        {client ? `${client.firstName} ${client.lastName}` : 'Client'}
      </Typography.Title>

      {client?.pictureUrl ? (
        <img
          src={client.pictureUrl}
          alt={`${client.firstName} ${client.lastName}`}
          style={{
            width: 120,
            height: 120,
            objectFit: 'cover',
            borderRadius: 8,
          }}
        />
      ) : null}

      <Form
        layout="vertical"
        onFinish={() =>
          updateClient(clientId, {
            firstName,
            lastName,
            email: email.length > 0 ? email : undefined,
            pictureUrl: pictureUrl.length > 0 ? pictureUrl : undefined,
          })
        }
      >
        <Form.Item label="First name">
          <Input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Last name">
          <Input value={lastName} onChange={e => setLastName(e.target.value)} />
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
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form>

      <Table
        rowKey="soldAt"
        dataSource={client?.sales ?? []}
        columns={[
          {
            title: 'Book',
            render: (_, row: ClientDetailsModel['sales'][number]) => (
              <Link to="/books/$bookId" params={{ bookId: row.bookId }}>
                {row.bookTitle}
              </Link>
            ),
          },
          {
            title: 'Author',
            dataIndex: 'authorName',
          },
          {
            title: 'Sale date',
            dataIndex: 'soldAt',
          },
        ]}
        pagination={false}
      />
    </Space>
  )
}
