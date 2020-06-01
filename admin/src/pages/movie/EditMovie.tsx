import React from 'react'
import { RouteComponentProps } from 'react-router'
import MovieForm from '../../components/MovieForm'
import { IMovie, MovieService } from '../../services/MovieService'

interface IParams {
  id: string
}

interface EditPageState {
  movie?: IMovie
}

export default class extends React.Component<RouteComponentProps<IParams>, EditPageState> {

  state: EditPageState = {
    movie: undefined
  }

  async componentDidMount() {
    const result = await MovieService.getMovieById(this.props.match.params.id)
    if (result) {
      this.setState({
        movie: result.data
      })
    }
  }

  render() {
    return (
      <MovieForm
        movie={this.state.movie}
        onSubmit={ async movie => {
          const result = await MovieService.edit(this.props.match.params.id, movie)
          if (result.data) {
            return ''
          } else {
            return result.error
          }
        } }
      />
    )
  }
}