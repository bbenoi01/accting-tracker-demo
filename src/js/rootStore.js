import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const INITIAL_STATE = {};

const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 25 });
const rootStore = createStore(
	rootReducer,
	INITIAL_STATE,
	composeEnhancers(applyMiddleware(thunk))
);

export default rootStore;
