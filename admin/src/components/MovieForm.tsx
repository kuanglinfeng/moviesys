import React from 'react'
import { Button, Checkbox, Form, Input, InputNumber, message, Switch } from 'antd'
import { FormInstance } from 'antd/lib/form'
import ImageUploader from './ImageUploader'
import { IMovie } from '../services/MovieService'
import { RouteComponentProps, withRouter } from 'react-router'

const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 19,
    offset: 1
  }
}

const AllAreas: { label: string, value: string }[] = [
  { label: '中国大陆', value: '中国大陆' },
  { label: '美国', value: '美国' },
  { label: '中国台湾', value: '中国台湾' },
  { label: '中国香港', value: '中国香港' }
]

const AreaGroups = Checkbox.Group

const AllTypes: { label: string, value: string }[] = [
  { label: '喜剧', value: '喜剧' },
  { label: '动作', value: '动作' },
  { label: '爱情', value: '爱情' },
  { label: '剧情', value: '剧情' }
]

const TypeGroups = Checkbox.Group

interface IFormProp extends RouteComponentProps<any> {
  // string is Error Message
  onSubmit: (movie: IMovie) => Promise<string>
  movie?: IMovie
}

class MovieForm extends React.Component<IFormProp, any> {

  formRef = React.createRef<FormInstance>()

  state = {
    url: '',
    isHot: false,
    isClassic: false,
    isComing: false
  }

  constructor(props: any) {
    super(props)
    console.log(this.props.movie)
  }

  componentDidMount() {
    console.log(this.props.movie)
  }

  private onFinish = async (values: object) => {
    const result = await this.props.onSubmit(values as IMovie)
    if (result) {
      message.error(result)
    } else {
      message.success('添加成功', 1, () => {
        // 跳转页面
        this.props.history.push('/movie')
      })
    }
  }

  private onUploadPoster(value: string) {
    this.formRef.current!.setFieldsValue({
      poster: value
    })
    this.setState({ url: value })
  }

  private onSwitchChange(type: 'isHot' | 'isClassic' | 'isComing', value: boolean) {
    this.formRef.current!.setFieldsValue({
      [type]: value
    })
    this.setState({ [type]: value })
  }

  render() {
    return (
      <Form
        { ...formItemLayout }
        style={ { width: '700px' } }
        ref={ this.formRef }
        onFinish={ this.onFinish.bind(this) }
        fields={
          [
            { name: 'name', value: this.props.movie?.name },
            {name: 'poster', value: this.props.movie?.poster},
            { name: 'areas', value: this.props.movie?.areas },
            { name: 'types', value: this.props.movie?.types },
            { name: 'timeLong', value: this.props.movie?.timeLong },
            {name: 'isHot', value: this.props.movie?.isHot},
            {name: 'isComing', value: this.props.movie?.isComing},
            {name: 'isClassic', value: this.props.movie?.isClassic},
            { name: 'description', value: this.props.movie?.description },
          ]
        }
      >
        <Form.Item
          label='电影名称'
          name='name'
          rules={ [{ required: true, message: '请填写电影名称' }] }
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='封面图'
          name='poster'
        >
          <ImageUploader />
        </Form.Item>
        <Form.Item
          label='上映地区'
          name='areas'
          rules={ [{ required: true, message: '请选择地区' }] }
        >
          <AreaGroups options={ AllAreas } />
        </Form.Item>
        <Form.Item
          label='类型'
          name='types'
          rules={ [{ required: true, message: '请选择类型' }] }

        >
          <TypeGroups options={ AllTypes } />
        </Form.Item>
        <Form.Item
          label='时长(分钟)'
          name='timeLong'
          rules={ [{ required: true, message: '请填写时长' }] }
        >
          <InputNumber min={ 1 } step={ 10 } />
        </Form.Item>
        <Form.Item
          label='正在热映'
          name='isHot'
          valuePropName='checked'
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label='即将上映'
          name='isComing'
          valuePropName='checked'
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label='经典影片'
          name='isClassic'
          valuePropName='checked'
        >
          <Switch />
        </Form.Item>
        <Form.Item
          label='描述'
          name='description'
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          labelCol={ { span: 0 } }
          wrapperCol={ { span: 19, offset: 5 } }
        >
          <Button type='primary' htmlType='submit'>提交</Button>
        </Form.Item>
      </Form>
    )
  }
}


export default withRouter(MovieForm)


