import { IMovie } from '../../services/MovieService'
import { IAction } from './ActionTypes'
import { ISearchCondition, SwitchType } from '../../services/CommonTypes'

/**
 * 保存电影的action的类型注解
 */
export type SaveMoviesAction = IAction<'movie_save', {
  movies: IMovie[]
  total: number
}>

/**
 * 保存电影的action的创建函数
 * @param movies
 * @param total
 */
const saveMovieAction = (movies: IMovie[], total: number): SaveMoviesAction => ({
  type: 'movie_save',
  payload: {
    movies,
    total
  }
})

/**
 * 设置Loading状态的action的类型注解
 */
export type SetLoadingAction = IAction<'movie_setLoading', boolean>

/**
 * 设置Loading状态的action的创建函数
 * @param isLoading
 */
const setLoadingAction = (isLoading: boolean): SetLoadingAction => ({
  type: 'movie_setLoading',
  payload: isLoading
})

/**
 * 设置电影查询条件的action的类型注解
 */
export type SetConditionAction = IAction<'movie_setCondition', ISearchCondition>

/**
 * 设置查询电影条件的action的创建函数
 * @param condition
 */
const setConditionAction = (condition: ISearchCondition): SetConditionAction => ({
  type: 'movie_setCondition',
  payload: condition
})

/**
 * 删除电影的action的类型注解
 */
export type DeleteAction = IAction<'movie_delete', string>

/**
 * 创建删除电影的action的创建函数
 * @param id
 */
const deleteAction = (id: string): DeleteAction => ({
  type: 'movie_delete',
  payload: id
})

export type MovieChangeSwitchAction = IAction<'movie_switch', {
  type: SwitchType,
  newVal: boolean,
  id: string
}>

function changeSwitchAction(type: SwitchType, newVal: boolean, id: string): MovieChangeSwitchAction {
  return {
    type: 'movie_switch',
    payload: {
      type,
      newVal,
      id
    }
  }
}

// 所有的Action情况
export type MovieActions = SaveMoviesAction | SetLoadingAction | SetConditionAction | DeleteAction

export default {
  saveMovieAction,
  setLoadingAction,
  setConditionAction,
  deleteAction
}