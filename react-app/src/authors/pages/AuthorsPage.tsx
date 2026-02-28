import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
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
import type { AuthorModel } from '../AuthorModel'
import { useAuthorProvider } from '../providers/useAuthorProvider'

export function AuthorsPage(): React.JSX.Element {
  const { authors, loadAuthors, createAuthor, deleteAuthor } =
    useAuthorProvider()
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)
  const [deleteAuthorId, setDeleteAuthorId] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [pictureUrl, setPictureUrl] = useState<string>('')

  useEffect(() => {
    loadAuthors()
  }, [loadAuthors])

  return (
    <Space direction="vertical" style={{ width: '100%', textAlign: 'left' }}>
      <Breadcrumb items={[{ title: 'Authors' }]} />
      <Typography.Title level={2}>Authors</Typography.Title>
      <Button type="primary" onClick={() => setIsCreateOpen(true)}>
        Create author
      </Button>
      <Table
        rowKey="id"
        dataSource={authors}
        columns={[
          {
            title: 'Name',
            render: (_, row: AuthorModel) => (
              <Link to="/authors/$authorId" params={{ authorId: row.id }}>
                {row.firstName} {row.lastName}
              </Link>
            ),
          },
          {
            title: 'Books written',
            dataIndex: 'booksCount',
          },
          {
            title: 'Actions',
            render: (_, row: AuthorModel) => (
              <Button danger onClick={() => setDeleteAuthorId(row.id)}>
                Delete
              </Button>
            ),
          },
        ]}
      />

      <Modal
        title="Create author"
        open={isCreateOpen}
        onCancel={() => setIsCreateOpen(false)}
        onOk={() => {
          createAuthor({
            firstName,
            lastName,
            pictureUrl: pictureUrl.length > 0 ? pictureUrl : undefined,
          }).then(() => {
            setFirstName('')
            setLastName('')
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
          <Form.Item label="Picture URL">
            <Input
              value={pictureUrl}
              onChange={e => setPictureUrl(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete this author?"
        open={deleteAuthorId.length > 0}
        onCancel={() => setDeleteAuthorId('')}
        onOk={() => {
          deleteAuthor(deleteAuthorId).then(() => {
            setDeleteAuthorId('')
          })
        }}
      >
        This action cannot be undone.
      </Modal>
    </Space>
  )
}
