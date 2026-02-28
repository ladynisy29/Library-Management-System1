import { BookOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import { Breadcrumb, Card, Col, List, Row, Space, Typography } from 'antd'

const stackItems: string[] = [
  'Back-end: TypeScript, NestJS, TypeORM, SQLite, REST API',
  'Front-end: TypeScript, React, Vite, Ant Design, TanStack Router',
]

const featureItems: string[] = [
  'Manage books, authors, and clients from dedicated pages',
  'Record and browse sales with dates and linked entities',
  'Use breadcrumbs and menu-based navigation for every domain',
  'Search globally across books, authors, and clients',
]

export function AboutPage(): React.JSX.Element {
  return (
    <Space direction="vertical" size={16} style={{ width: '100%', textAlign: 'left' }}>
      <Breadcrumb items={[{ title: 'About' }]} />

      <Typography.Title level={2}>About this project</Typography.Title>
      <Typography.Paragraph>
        This library management system helps you manage your catalog, authors,
        clients, and sales operations in one consistent interface.
      </Typography.Paragraph>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card title="Books" extra={<BookOutlined />}>
            <Typography.Text>Track books and clients who bought them.</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Authors" extra={<TeamOutlined />}>
            <Typography.Text>
              Manage author details and see average sales performance.
            </Typography.Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Clients" extra={<UserOutlined />}>
            <Typography.Text>
              Store client profiles and purchase history.
            </Typography.Text>
          </Card>
        </Col>
      </Row>

      <Card title="Technical stack">
        <List
          dataSource={stackItems}
          renderItem={(item: string): React.JSX.Element => (
            <List.Item>{item}</List.Item>
          )}
        />
      </Card>

      <Card title="Main features">
        <List
          dataSource={featureItems}
          renderItem={(item: string): React.JSX.Element => (
            <List.Item>{item}</List.Item>
          )}
        />
      </Card>
    </Space>
  )
}
