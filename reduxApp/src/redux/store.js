import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducers from './reducers';

const middleware = [thunk];
import {composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;