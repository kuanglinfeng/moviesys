// 描述电影列表的状态类型

import { IMovie } from '../../services/MovieService'
import { ISearchCondition } from '../../services/CommonTypes'

// 让ISearchCondition接口里的类型都变为必填的
export type IMovieCondition = Required<ISearchCondition>

export interface IMovieState {
  /**
   * 电影数组
   */
  data: IMovie[]
  /**
   * 查询条件
   */
  condition: IMovieCondition
  /**
   * 总记录数
   */
  total: number
  /**
   * 是否正在加载数据
   */
  isLoading: boolean
}