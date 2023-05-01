import { combineReducers } from 'redux'
import user from './user'
import navigation from './navigation'
import stay from './stay'
import event from './event'

const todoApp = combineReducers({
  user, navigation, stay, event
})

export default todoApp