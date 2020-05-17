import React from 'react'
import { IMovieState } from '../redux/reducers/MovieReducer'
import { Switch, Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import { IMovie } from '../services/MovieService'
import defaultPoster from '../assets/defaultPoster.png'
import { SwitchType } from '../services/CommonTypes'

export interface IMovieTableEvents {
  /**
   * 完成加载之后的事件
   */
  onLoad: () => void

  onSwitchChange: (id: string, type: SwitchType, newState: boolean) => void
}


export default class extends React.Component<IMovieState & IMovieTableEvents> {

  componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad()
    }
  }

  private getColumns(): ColumnProps<IMovie>[] {
    return [
      {
        title: '封面',
        dataIndex: 'poster',
        render: poster => {
          if (poster) {
            return <img className='tablePoster' src={poster} alt='封面' />
          } else {
            return <img className='tablePoster' src={defaultPoster} alt='暂无'/>
          }
        }
      },
      {
        title: '名称',
        dataIndex: 'name',
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
          return <Switch checked={isHot}  onChange={(newVal: boolean) => {
            this.props.onSwitchChange(record._id as string, SwitchType.isHot, newVal)
          }} />
        }
      },
      {
        title: '即将上映',
        dataIndex: 'isComing',
        render: (isComing: boolean, record) => {
          return <Switch checked={isComing}  onChange={(newVal: boolean) => {
            this.props.onSwitchChange(record._id as string, SwitchType.isComing, newVal)
          }} />
        }
      },
      {
        title: '经典影片',
        dataIndex: 'isClassic',
        render: (isClassic: boolean, record) => {
          return <Switch checked={isClassic}  onChange={(newVal: boolean) => {
            this.props.onSwitchChange(record._id as string, SwitchType.isClassic, newVal)
          }} />
        }
      },
    ]
  }

  render() {
    return (
      <Table
        dataSource={this.props.data}
        columns={this.getColumns()}
        rowKey="_id"
      >

      </Table>
    )
  }
}