import { combineReducers } from 'redux';
import AuthReducer from './pages/Auth/reducer';
import ForgotPasswordReducer from './pages/ForgotPassword/reducer';
import ResetPasswordReducer from './pages/ResetPassword/reducer';
import MainReducer from './pages/Main/reducer';

const rootReducer = combineReducers({
	auth: AuthReducer,
	fp: ForgotPasswordReducer,
	rp: ResetPasswordReducer,
	main: MainReducer,
});

export default rootReducer;
