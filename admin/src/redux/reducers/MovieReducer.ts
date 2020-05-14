// 描述电影列表的状态类型

import { IMovie } from '../../services/MovieService'
import { ISearchCondition } from '../../services/CommonTypes'
import {
  DeleteAction,
  MovieActions,
  SaveMoviesAction,
  SetConditionAction,
  SetLoadingAction
} from '../actions/MovieAction'
import { Reducer } from 'react'

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

const defaultState: IMovieState = {
  data: [],
  condition: {
    page: 1,
    limit: 10,
    key: ''
  },
  total: 0,
  isLoading: false
}

type MovieReducer<A> = Reducer<IMovieState, A>

const saveMovie: MovieReducer<SaveMoviesAction> = (state, action) => ({
  ...state,
  data: action.payload.movies,
  total: action.payload.total
})

const setCondition: MovieReducer<SetConditionAction> = (state, action) => ({
  ...state,
  condition: {
    ...state.condition,
    ...action.payload
  }
})

const setLoading: MovieReducer<SetLoadingAction> = (state, action) => ({
  ...state,
  isLoading: action.payload
})

const deleteMovie: MovieReducer<DeleteAction> = (state, action) => ({
  ...state,
  data: state.data.filter(movie => movie._id !== action.payload),
  total: state.total - 1
})


export default (state: IMovieState = defaultState, action: MovieActions): IMovieState => {
  switch (action.type) {
    case 'movie_save':
      return saveMovie(state, action)
    case 'movie_setLoading':
      return setLoading(state, action)
    case 'movie_setCondition':
      return setCondition(state, action)
    case 'movie_delete':
      return deleteMovie(state, action)
    default:
      return state
  }
}