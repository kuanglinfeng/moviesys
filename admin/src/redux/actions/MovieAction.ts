import { IMovie } from '../../services/MovieService'
import { IAction } from './ActionTypes'

export type SaveMoviesAction = IAction<'movie_save', {
  movies: IMovie[]
  total: number
}>

function saveMovieAction(movies: IMovie[], total: number): SaveMoviesAction {
  return {
    type: 'movie_save',
    payload: {
      // 负载、负荷
      movies,
      total
    }
  }
}