import { createStore } from 'redux';
import rootReducer from './reducers';
import * as actions from './actions';

export const store = createStore(rootReducer);
export { actions };

//# Debug
(<any>window).store = store;
