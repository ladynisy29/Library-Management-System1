import { useEffect, useState } from 'react'
import type { CreateBookModel } from '../BookModel'
import { Button, Input, Modal, Select, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useBookAuthorsProviders } from '../providers/useBookAuthorsProviders'

interface CreateBookModalProps {
  onCreate: (book: CreateBookModel) => Promise<void>
}

export function CreateBookModal({
  onCreate,
}: CreateBookModalProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [yearPublished, setYearPublished] = useState<number>(0)
  const [pictureUrl, setPictureUrl] = useState<string>('')
  const [authorId, setAuthorId] = useState<string | undefined>(undefined)
  const { authors, loadAuthors } = useBookAuthorsProviders()

  const onClose = (): void => {
    setTitle('')
    setYearPublished(0)
    setPictureUrl('')
    setAuthorId(undefined)
    setIsOpen(false)
  }

  useEffect(() => {
    if (isOpen) {
      loadAuthors()
    }
  }, [isOpen, loadAuthors])

  return (
    <>
      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsOpen(true)}
      >
        Create Book
      </Button>
      <Modal
        open={isOpen}
        onCancel={onClose}
        onOk={() => {
          if (!authorId) {
            return
          }

          onCreate({
            title,
            yearPublished,
            authorId,
            pictureUrl: pictureUrl.length > 0 ? pictureUrl : undefined,
          })
          onClose()
        }}
        okButtonProps={{
          disabled: !authorId || !title?.length || !yearPublished,
        }}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
          />
          <Input
            type="text"
            placeholder="Picture URL"
            value={pictureUrl}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPictureUrl(event.target.value)
            }
          />
          <Select
            style={{ width: '100%' }}
            options={authors.map(author => ({
              label: `${author.firstName} ${author.lastName}`,
              value: author.id,
            }))}
            onChange={(value: string) => setAuthorId(value)}
          />
          <Input
            type="number"
            placeholder="Year Published"
            value={yearPublished}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setYearPublished(Number(event.target.value))
            }
          />
        </Space>
      </Modal>
    </>
  )
}
