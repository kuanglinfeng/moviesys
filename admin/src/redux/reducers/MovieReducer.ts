// 描述电影列表的状态类型

import { IMovie } from '../../services/MovieService'
import { ISearchCondition } from '../../services/CommonTypes'
import {
  DeleteAction,
  MovieAction, MovieChangeSwitchAction,
  SaveMoviesAction,
  SetConditionAction,
  SetLoadingAction
} from '../actions/MovieActions'
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

  /**
   * 总页数
   */
  totalPage: number
}

const defaultState: IMovieState = {
  data: [],
  condition: {
    page: 1,
    limit: 10,
    key: ''
  },
  total: 0,
  isLoading: false,
  totalPage: 0
}

type MovieReducer<A> = Reducer<IMovieState, A>

const saveMovie: MovieReducer<SaveMoviesAction> = (state, action) => ({
  ...state,
  data: action.payload.movies,
  total: action.payload.total,
  totalPage: Math.ceil(action.payload.total / state.condition.limit)
})

const setCondition: MovieReducer<SetConditionAction> = (state, action) => {
  const newState = {
    ...state,
    condition: {
      ...state.condition,
      ...action.payload
    }
  }
  newState.totalPage = Math.ceil(newState.total / newState.condition.limit)
  return newState
}

const setLoading: MovieReducer<SetLoadingAction> = (state, action) => ({
  ...state,
  isLoading: action.payload
})

const deleteMovie: MovieReducer<DeleteAction> = (state, action) => ({
  ...state,
  data: state.data.filter(movie => movie._id !== action.payload),
  total: state.total - 1,
  totalPage: Math.ceil((state.total - 1) / state.condition.limit)
})

const changeSwitch: MovieReducer<MovieChangeSwitchAction> = (state, action) => {

  // 1. 根据id找对象
  const movie = state.data.find(movie => movie._id === action.payload.id)
  if (!movie) return state
  // 2. 将找到的对象克隆一份
  const newMovie = { ...movie }
  // 3. 设置这个新对象的isHot | isComing | isClassic
  newMovie[action.payload.type] = action.payload.newVal
  // 4. 将这个新对象重新放入数组，覆盖掉原来的对象
  const newData = state.data.map(movie => {
    if (movie._id === action.payload.id) {
      return newMovie
    }
    return movie
  })
  return {
    ...state,
    data: newData
  }
}

export default (state: IMovieState = defaultState, action: MovieAction): IMovieState => {
  switch (action.type) {
    case 'movie_save':
      return saveMovie(state, action)
    case 'movie_setLoading':
      return setLoading(state, action)
    case 'movie_setCondition':
      return setCondition(state, action)
    case 'movie_delete':
      return deleteMovie(state, action)
    case 'movie_switch':
      return changeSwitch(state, action)
    default:
      return state
  }
}