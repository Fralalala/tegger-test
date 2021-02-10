import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {youtubeDataReducer} from './reducers/youtubeDataReducer'

const reducer = combineReducers({
    youtubeDataReducer
})

const initialState = {}

const middlware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlware))
  );

export default store