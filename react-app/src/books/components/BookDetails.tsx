import {
  Breadcrumb,
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Skeleton,
  Space,
  Table,
  Typography,
} from 'antd'
import { useBookDetailsProvider } from '../providers/useBookDetailsProvider'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Route as booksRoute } from '../../routes/books'
import type { ClientModel } from '../../clients/ClientModel'
import { apiClient } from '../../api'
import type { BookDetailsModel } from '../BookModel'

interface BookDetailsProps {
  id: string
}

export const BookDetails = ({ id }: BookDetailsProps): React.JSX.Element => {
  const { isLoading, book, loadBook, updateBook, recordSale } =
    useBookDetailsProvider(id)
  const [title, setTitle] = useState<string>('')
  const [yearPublished, setYearPublished] = useState<number>(0)
  const [pictureUrl, setPictureUrl] = useState<string>('')
  const [isSaleModalOpen, setIsSaleModalOpen] = useState<boolean>(false)
  const [saleClientId, setSaleClientId] = useState<string>('')
  const [saleDate, setSaleDate] = useState<string>('')
  const [clients, setClients] = useState<ClientModel[]>([])

  const breadcrumbItems = useMemo(
    () => [
      {
        title: <Link to={booksRoute.to}>Books</Link>,
      },
      {
        title: book?.title ?? 'Details',
      },
    ],
    [book?.title],
  )

  useEffect(() => {
    loadBook()
  }, [id, loadBook])

  useEffect(() => {
    if (!book) {
      return
    }

    setTitle(book.title)
    setYearPublished(book.yearPublished)
    setPictureUrl(book.pictureUrl ?? '')
  }, [book])

  useEffect(() => {
    apiClient.get<ClientModel[]>('/clients').then(response => {
      setClients(response.data)
    })
  }, [])

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <Space direction="vertical" style={{ textAlign: 'left', width: '95%' }}>
      <Breadcrumb items={breadcrumbItems} />
      <Link to={booksRoute.to}>
        <ArrowLeftOutlined />
      </Link>
      <Typography.Title level={1}>{book?.title}</Typography.Title>

      {book?.pictureUrl ? (
        <img
          src={book.pictureUrl}
          alt={book.title}
          style={{
            width: 160,
            height: 160,
            objectFit: 'cover',
            borderRadius: 8,
          }}
        />
      ) : null}

      <Form
        layout="vertical"
        onFinish={() =>
          updateBook({
            title,
            yearPublished,
            pictureUrl,
          })
        }
      >
        <Form.Item label="Title">
          <Input value={title} onChange={e => setTitle(e.target.value)} />
        </Form.Item>
        <Form.Item label="Year published">
          <Input
            type="number"
            value={yearPublished}
            onChange={e => setYearPublished(Number(e.target.value))}
          />
        </Form.Item>
        <Form.Item label="Picture URL">
          <Input
            value={pictureUrl}
            onChange={e => setPictureUrl(e.target.value)}
          />
        </Form.Item>
        <Button htmlType="submit" type="primary">
          Save
        </Button>
      </Form>

      <Button type="primary" onClick={() => setIsSaleModalOpen(true)}>
        Record sale
      </Button>

      <Table
        rowKey="soldAt"
        dataSource={book?.clients ?? []}
        columns={[
          {
            title: 'Client',
            render: (_, row: BookDetailsModel['clients'][number]) =>
              `${row.firstName} ${row.lastName}`,
          },
          {
            title: 'Sale date',
            dataIndex: 'soldAt',
          },
        ]}
        pagination={false}
      />

      <Modal
        title="Record a sale"
        open={isSaleModalOpen}
        onCancel={() => setIsSaleModalOpen(false)}
        onOk={() => {
          recordSale({
            clientId: saleClientId,
            soldAt: saleDate,
          }).then(() => setIsSaleModalOpen(false))
        }}
        okButtonProps={{
          disabled: saleClientId.length === 0 || saleDate.length === 0,
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select
            style={{ width: '100%' }}
            placeholder="Select client"
            options={clients.map(client => ({
              label: `${client.firstName} ${client.lastName}`,
              value: client.id,
            }))}
            onChange={(value: string) => setSaleClientId(value)}
          />
          <DatePicker
            style={{ width: '100%' }}
            onChange={value => {
              setSaleDate(value ? value.toISOString() : '')
            }}
          />
        </Space>
      </Modal>
    </Space>
  )
}
