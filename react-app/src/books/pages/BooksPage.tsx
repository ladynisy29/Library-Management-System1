import { Outlet } from '@tanstack/react-router'
import { BookList } from '../components/BookList'
import { Breadcrumb, Space, Typography } from 'antd'

export function BooksPage(): React.JSX.Element {
  return (
    <Space direction="vertical" style={{ width: '100%', textAlign: 'left' }}>
      <Breadcrumb items={[{ title: 'Books' }]} />
      <Typography.Title level={2}>Books</Typography.Title>
      <BookList />
      <Outlet />
    </Space>
  )
}
