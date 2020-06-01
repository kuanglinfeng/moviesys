import React from 'react'
import MovieForm from '../../components/MovieForm'
import { MovieService } from '../../services/MovieService'

export default class extends React.Component {
  render() {
    return (
      <MovieForm onSubmit={async movie => {
        const result = await MovieService.add(movie)
        if (result.data) {
          return ''
        } else {
          return result.error
        }
      }} />
    )
  }
}