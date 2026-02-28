import { BookOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Link } from '@tanstack/react-router'
import { Button, Card, Col, Row, Space, Typography } from 'antd'
import './App.css'

function App(): React.JSX.Element {
  return (
    <Space className="home-page" direction="vertical" size={24}>
      <Space direction="vertical" size={8}>
        <Typography.Title level={2}>
          Welcome to Babel&apos;s Library
        </Typography.Title>
        <Typography.Text>
          Manage books, authors, clients, and sales from one place.
        </Typography.Text>
      </Space>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card title="Books" extra={<BookOutlined />}>
            <Space direction="vertical" size={12}>
              <Typography.Text>
                Browse books and track sales history.
              </Typography.Text>
              <Link to="/books">
                <Button type="primary">Go to books</Button>
              </Link>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Authors" extra={<TeamOutlined />}>
            <Space direction="vertical" size={12}>
              <Typography.Text>
                Manage author profiles and their published books.
              </Typography.Text>
              <Link to="/authors">
                <Button type="primary">Go to authors</Button>
              </Link>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Card title="Clients" extra={<UserOutlined />}>
            <Space direction="vertical" size={12}>
              <Typography.Text>
                View clients and record book purchases.
              </Typography.Text>
              <Link to="/clients">
                <Button type="primary">Go to clients</Button>
              </Link>
            </Space>
          </Card>
        </Col>
      </Row>
    </Space>
  )
}

export default App
