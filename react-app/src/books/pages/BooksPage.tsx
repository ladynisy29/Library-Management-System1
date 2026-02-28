import { Outlet } from '@tanstack/react-router'
import { SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { BookList } from '../components/BookList'
import { Breadcrumb, Input, Space, Typography } from 'antd'

export function BooksPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('')

  return (
    <Space direction="vertical" style={{ width: '100%', textAlign: 'left' }}>
      <Breadcrumb items={[{ title: 'Books' }]} />
      <Typography.Title level={2}>Books</Typography.Title>
      <Input.Search
        allowClear
        prefix={<SearchOutlined />}
        size="large"
        style={{ maxWidth: 420 }}
        placeholder="Search books by title or author"
        value={searchQuery}
        onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
          setSearchQuery(event.target.value)
        }}
      />
      <BookList searchQuery={searchQuery} />
      <Outlet />
    </Space>
  )
}
