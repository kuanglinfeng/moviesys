import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import Home from './Home'
import MovieList from './movie/MovieList'
import AddMovie from './movie/AddMovie'
import EditMovie from './movie/EditMovie'

const Layout: React.FC = () => {
  return (
    <div>
      <header>
        <ul>
          <li>
            <NavLink to='/'>首页</NavLink>
          </li>
          <li>
            <NavLink to='/movie'>电影</NavLink>
          </li>
          <li>
            <NavLink to='/movie/add'>添加电影</NavLink>
          </li>
          <li>
            <NavLink to='/movie/edit/123df12'>修改电影</NavLink>
          </li>
        </ul>
        <div>
          <Route path='/' component={ Home } exact />
          <Route path='/movie' component={ MovieList } exact />
          <Route path='/movie/add' component={ AddMovie } exact />
          <Route path='/movie/edit/:id' component={ EditMovie } exact />
        </div>
      </header>
    </div>
  )
}

export default Layout