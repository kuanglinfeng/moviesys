import { IMovie, MovieService } from '../../services/MovieService'
import { IAction } from './ActionTypes'
import { ISearchCondition, SwitchType } from '../../services/CommonTypes'
import { IRootState } from '../reducers/RootReducer'
import { ThunkAction } from 'redux-thunk'

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

function changeSwitchAction(id: string, type: SwitchType, newVal: boolean): MovieChangeSwitchAction {
  return {
    type: 'movie_switch',
    payload: {
      id,
      type,
      newVal
    }
  }
}

function changeSwitch(id: string, type: SwitchType, newVal: boolean): ThunkAction<Promise<void>, IRootState, any, MovieAction> {
  return async dispatch => {
    dispatch(changeSwitchAction(id, type, newVal))
    await MovieService.edit(id, {
      [type]: newVal
    })
  }
}

// 所有的Action情况
export type MovieAction = SaveMoviesAction | SetLoadingAction | SetConditionAction | DeleteAction | MovieChangeSwitchAction

// 根据条件从服务器获取电影，注：这里的ThunkAction过于绕，不理解可用any替代
function fetchMovies(condition: ISearchCondition): ThunkAction<Promise<void>, IRootState, any, MovieAction> {
  return async (dispatch, getState) => {
    // 1. 设置加载状态
    dispatch(setLoadingAction(true))
    // 2. 设置条件
    dispatch(setConditionAction(condition))
    // 3. 获取服务器数据
    const enhanceCondition = getState().movie.condition
    const data = await MovieService.getMovies(enhanceCondition)
    // 4. 更改仓库的数据
    dispatch(saveMovieAction(data.data, data.total))
    // 5. 关闭加载状态
    dispatch(setLoadingAction(false))
  }
}

function deleteMovie(id: string): ThunkAction<Promise<void>, IRootState, any, MovieAction> {
  return async dispatch => {
    dispatch(setLoadingAction(true))
    // 删除数据库中的数据
    await MovieService.delete(id)
    // 删除本地仓库中的数据
    dispatch(deleteAction(id))
    dispatch(setLoadingAction(false))
  }
}


export default {
  saveMovieAction,
  setLoadingAction,
  setConditionAction,
  deleteAction,
  fetchMovies,
  deleteMovie,
  changeSwitch
}