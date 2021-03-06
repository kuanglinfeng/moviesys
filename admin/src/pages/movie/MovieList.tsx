import { Dispatch } from 'react'
import MovieTable, { IMovieTableEvents } from '../../components/MovieTable'
import { connect } from 'react-redux'
import { IRootState } from '../../redux/reducers/RootReducer'
import MovieActions from '../../redux/actions/MovieActions'
import { IMovieState } from '../../redux/reducers/MovieReducer'

const mapStateToProps = (state: IRootState): IMovieState => {
  return state.movie
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IMovieTableEvents => {
  return {
    onLoad() {
      dispatch(MovieActions.fetchMovies({
        page: 1,
        limit: 10,
        key: ''
      }))
    },
    onSwitchChange(id, type, newState) {
      dispatch(MovieActions.changeSwitch(id, type, newState))
    },
    async onDelete(id: string) {
      await dispatch(MovieActions.deleteMovie(id))
    },
    onChange(newPage: number) {
      dispatch(MovieActions.fetchMovies({
        page: newPage
      }))
    },
    onKeyChange(key: string) {
      dispatch(MovieActions.setConditionAction({
        key
      }))
    },
    onSearch() {
      // 搜索时回到第一页
      dispatch(MovieActions.fetchMovies({
        page: 1
      }))
    }
  }
}

const HOC = connect(mapStateToProps, mapDispatchToProps)

export default HOC(MovieTable)

// 仓库里面有数据，但没有界面

// MovieTable组件有界面，但是没有数据

// react-redux