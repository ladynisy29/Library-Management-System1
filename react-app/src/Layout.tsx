import { Link, useRouterState } from '@tanstack/react-router'
import { Route as indexRoute } from './routes/index'
import { Route as booksRoute } from './routes/books'
import { Route as authorsRoute } from './routes/authors'
import { Route as clientsRoute } from './routes/clients'
import { Route as aboutRoute } from './routes/about'
import { Layout as AntLayout, Menu, Space, Typography, type MenuProps } from 'antd'
import {
  BookOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  const pathname: string = useRouterState({
    select: state => state.location.pathname,
  })

  const selectedMenuItem: string =
    pathname === '/'
      ? 'home'
      : pathname.startsWith('/books')
        ? 'books'
        : pathname.startsWith('/authors')
          ? 'authors'
          : pathname.startsWith('/clients')
            ? 'clients'
            : pathname.startsWith('/about')
              ? 'about'
              : 'home'

  const items: Required<MenuProps>['items'] = [
    {
      label: <Link to={indexRoute.to}>Home</Link>,
      key: 'home',
      icon: <HomeOutlined />,
    },
    {
      label: <Link to={booksRoute.to}>Books</Link>,
      key: 'books',
      icon: <BookOutlined />,
    },
    {
      label: <Link to={authorsRoute.to}>Authors</Link>,
      key: 'authors',
      icon: <TeamOutlined />,
    },
    {
      label: <Link to={clientsRoute.to}>Clients</Link>,
      key: 'clients',
      icon: <UserOutlined />,
    },
    {
      label: <Link to={aboutRoute.to}>About</Link>,
      key: 'about',
      icon: <InfoCircleOutlined />,
    },
  ]

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <AntLayout.Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          paddingInline: 16,
        }}
      >
        <Space align="center" size={16} style={{ flex: 1, minWidth: 0 }}>
          <Typography.Title
            level={4}
            style={{ margin: 0, color: 'white', whiteSpace: 'nowrap' }}
          >
            Babel&apos;s Library
          </Typography.Title>
          <Menu
            mode="horizontal"
            theme="dark"
            items={items}
            selectedKeys={[selectedMenuItem]}
            style={{ minWidth: 0, flex: 1 }}
          />
        </Space>

      </AntLayout.Header>

      <AntLayout.Content style={{ padding: '16px 24px', overflowY: 'auto' }}>
        <div style={{ margin: '0 auto', width: '100%', maxWidth: 1200 }}>
          {children}
        </div>
      </AntLayout.Content>
    </AntLayout>
  )
}
