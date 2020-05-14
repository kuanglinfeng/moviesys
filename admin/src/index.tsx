import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from './redux/store'
import MovieAction from './redux/actions/MovieAction'

store.dispatch(MovieAction.fetchMovies({
  page: 2
})).then(() => {
  store.dispatch(MovieAction.deleteMovie('5eaa4c2dfcf5f30d10c73667'))
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
