import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Breadcrumb, Button, Form, Input, Space, Table, Typography } from 'antd'
import type { AuthorDetailsModel } from '../AuthorModel'
import { useAuthorProvider } from '../providers/useAuthorProvider'

interface AuthorDetailsPageProps {
  authorId: string
}

export function AuthorDetailsPage({
  authorId,
}: AuthorDetailsPageProps): React.JSX.Element {
  const { author, loadAuthor, updateAuthor } = useAuthorProvider()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [pictureUrl, setPictureUrl] = useState<string>('')

  useEffect(() => {
    loadAuthor(authorId)
  }, [authorId, loadAuthor])

  useEffect(() => {
    if (!author) {
      return
    }

    setFirstName(author.firstName)
    setLastName(author.lastName)
    setPictureUrl(author.pictureUrl ?? '')
  }, [author])

  return (
    <Space direction="vertical" style={{ width: '100%', textAlign: 'left' }}>
      <Breadcrumb
        items={[
          {
            title: <Link to="/authors">Authors</Link>,
          },
          {
            title: author
              ? `${author.firstName} ${author.lastName}`
              : 'Details',
          },
        ]}
      />

      <Typography.Title level={2}>
        {author ? `${author.firstName} ${author.lastName}` : 'Author'}
      </Typography.Title>

      {author?.pictureUrl ? (
        <img
          src={author.pictureUrl}
          alt={`${author.firstName} ${author.lastName}`}
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
          updateAuthor(authorId, {
            firstName,
            lastName,
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

      <Typography.Text>
        Average number of sales for this author&apos;s books:{' '}
        {author?.averageSales ?? 0}
      </Typography.Text>

      <Table
        rowKey="id"
        dataSource={author?.books ?? []}
        columns={[
          {
            title: 'Book',
            render: (_, row: AuthorDetailsModel['books'][number]) => (
              <Link to="/books/$bookId" params={{ bookId: row.id }}>
                {row.title}
              </Link>
            ),
          },
          {
            title: 'Year',
            dataIndex: 'yearPublished',
          },
        ]}
        pagination={false}
      />
    </Space>
  )
}
