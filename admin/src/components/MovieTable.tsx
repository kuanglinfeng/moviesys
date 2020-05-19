import React from 'react'
import { IMovieState } from '../redux/reducers/MovieReducer'
import { Button, Input, message, Popconfirm, Switch, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { IMovie } from '../services/MovieService'
import defaultPoster from '../assets/defaultPoster.png'
import { SwitchType } from '../services/CommonTypes'
import { NavLink } from 'react-router-dom'
import { TablePaginationConfig } from 'antd/es/table'
import { PaginationConfig } from 'antd/es/pagination'
import { SearchOutlined } from '@ant-design/icons/lib'

export interface IMovieTableEvents {
  /**
   * 完成加载之后的事件
   */
  onLoad: () => void

  onSwitchChange: (id: string, type: SwitchType, newState: boolean) => void

  onDelete: (id: string) => Promise<void>

  onChange: (newPage: number) => void

  onKeyChange: (key: string) => void

  onSearch: () => void
}


export default class extends React.Component<IMovieState & IMovieTableEvents> {

  componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad()
    }
  }


  private getFilterDropDown(p: Object) {
    return (
      <div style={ { padding: 8 } }>
        <Input
          style={ { width: 188, marginBottom: 8, display: 'block' } }
          value={this.props.condition.key}
          onChange={e => this.props.onKeyChange(e.target.value)}
          onPressEnter={this.props.onSearch}
        />
        <Button
          type='primary'
          size='small'
          style={ { width: 90, marginRight: 8 } }
          onClick={this.props.onSearch}
        >
          搜索
        </Button>
        <Button
          size='small'
          style={ { width: 90 } }
          onClick={() => {
            this.props.onKeyChange('')
            this.props.onSearch()
          }}
        >
          重置
        </Button>
      </div>
    )
  }

  private getColumns(): ColumnProps<IMovie>[] {
    return [
      {
        title: '封面',
        dataIndex: 'poster',
        render: poster => {
          if (poster) {
            return <img className='tablePoster' src={ poster } alt='封面' />
          } else {
            return <img className='tablePoster' src={ defaultPoster } alt='暂无' />
          }
        }
      },
      {
        title: '名称',
        dataIndex: 'name',
        filterDropdown: this.getFilterDropDown.bind(this),
        filterIcon: <SearchOutlined />
      },
      {
        title: '地区',
        dataIndex: 'areas',
        render(text: string[]) {
          return text.join(', ')
        }
      },
      {
        title: '类型',
        dataIndex: 'types',
        render(text: string[]) {
          return text.join(', ')
        }
      },
      {
        title: '时长',
        dataIndex: 'timeLong',
        render(timeLong: number) {
          return timeLong + '分钟'
        }
      },
      {
        title: '正在热映',
        dataIndex: 'isHot',
        render: (isHot: boolean, record) => {
          return <Switch checked={ isHot } onChange={ (newVal: boolean) => {
            this.props.onSwitchChange(record._id as string, SwitchType.isHot, newVal)
          } } />
        }
      },
      {
        title: '即将上映',
        dataIndex: 'isComing',
        render: (isComing: boolean, record) => {
          return <Switch checked={ isComing } onChange={ (newVal: boolean) => {
            this.props.onSwitchChange(record._id as string, SwitchType.isComing, newVal)
          } } />
        }
      },
      {
        title: '经典影片',
        dataIndex: 'isClassic',
        render: (isClassic: boolean, record) => {
          return <Switch checked={ isClassic } onChange={ (newVal: boolean) => {
            this.props.onSwitchChange(record._id as string, SwitchType.isClassic, newVal)
          } } />
        }
      },
      {
        title: '操作',
        dataIndex: '_id',
        render: (id) => {
          return (
            <div>
              <NavLink to={ `/movie/edit/${ id }` }>
                <Button type='primary'>编辑</Button>
              </NavLink>
              <Popconfirm
                title="确定要删除吗？"
                onConfirm={ async () => {
                  await this.props.onDelete(id)
                  message.success('删除成功')
                } }
                okText='确定'
                cancelText='取消'
              >
                <Button type='primary' danger>删除</Button>
              </Popconfirm>
            </div>
          )
        }
      },
    ]
  }

  getPageConfig(): TablePaginationConfig | false {
    if (this.props.total === 0) return false
    return {
      current: this.props.condition.page,
      pageSize: this.props.condition.limit,
      total: this.props.total
    }
  }

  handleChange(pagination: PaginationConfig, filters: any) {
    this.props.onChange(pagination.current!)
  }


  render() {
    return (
      <Table
        dataSource={ this.props.data }
        columns={ this.getColumns() }
        rowKey="_id"
        pagination={ this.getPageConfig() }
        onChange={ this.handleChange.bind(this) }
        loading={ this.props.isLoading }
      >

      </Table>
    )
  }
}