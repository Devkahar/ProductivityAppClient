import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {contestReducer} from './cpmodeReducer'
import { authReducer } from './authReducer';
const reducer = combineReducers({
    contestList:contestReducer,
    userData: authReducer,
})
const userData =localStorage.getItem('userData');
const initialState = {
  userData: userData? {...JSON.parse(userData),isUser: true}:{},
}
const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )
//   console.log(store);
  export default store;