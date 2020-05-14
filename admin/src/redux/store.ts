import { applyMiddleware, createStore } from 'redux'
import { IRootState, rootReducer } from './reducers/RootReducer'
import logger from 'redux-logger'
import thunk, {ThunkMiddleware} from 'redux-thunk'

export const store = createStore(rootReducer,
  // ThunkMiddleware<IRootState> 有点绕，这样写仅仅为了dispatch时能获得类型检查
  applyMiddleware(thunk as ThunkMiddleware<IRootState>, logger)
)