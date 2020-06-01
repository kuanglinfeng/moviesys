import React from 'react'
import { message, Modal, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons/lib'
import { UploadFile } from 'antd/es/upload/interface'
import { IResponseData, IResponseError } from '../services/CommonTypes'

interface IImageUploaderProps {
  url?: string
  onUrlChange?: (url: string) => void
}

interface IImageUploadState {
  isModalSeen: boolean
}

export default class extends React.Component<IImageUploaderProps, IImageUploadState> {

  state: IImageUploadState = {
    isModalSeen: false
  }

  private getUploadContent() {
    if (this.props.url) return null
    return (
      <div>
        <PlusOutlined />
        <div>
          点击上传
        </div>
      </div>
    )
  }

  private getFileList(): UploadFile[] {
    if (this.props.url) {
      return [
        {
          uid: this.props.url,
          name: this.props.url,
          url: this.props.url
        }
      ]
    }
    return []
  }

  async handleUploadRequest(p: any) {
    let formData = new FormData()
    formData.append(p.filename, p.file)
    const request = new Request(p.action, {
      method: 'post',
      body: formData
    })
    const response: IResponseData<string> | IResponseError = await fetch(request).then(response => response.json())
    if (response.error) {
      message.error('上传失败！')
    } else {
      if (this.props.onUrlChange) {
        this.props.onUrlChange(response.data!)
      }
    }
  }

  render() {
    return (
      <div>
        <Upload
          action='/api/upload'
          name='imageFile'
          accept='.jpg, .png, .gif'
          listType='picture-card'
          // @ts-ignore
          fileList={this.getFileList()}
          customRequest={this.handleUploadRequest.bind(this)}
          onRemove={() => {
            this.props.onUrlChange && this.props.onUrlChange('')
          }}
          onPreview={() => {
            this.setState({isModalSeen: true})
          }}
        >
          { this.getUploadContent() }
        </Upload>
        <Modal
          visible={this.state.isModalSeen}
          footer={null}
          onCancel={() => this.setState({isModalSeen: false})}
        >
          <img alt="example" style={{ width: '100%' }} src={this.props.url} />
        </Modal>
      </div>
    )
  }
}