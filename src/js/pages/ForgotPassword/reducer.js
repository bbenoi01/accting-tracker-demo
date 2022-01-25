import { types } from '../../types';

const INITIAL_STATE = {
	loading: false,
	errors: {},
};

const ForgotPasswordReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case types.GENERATE_PASSWORD_TOKEN_START: {
			return {
				...state,
				loading: true,
			};
		}

		case types.GENERATE_PASSWORD_TOKEN_SUCCESS: {
			return {
				...state,
				loading: false,
				success: payload,
				errors: {},
			};
		}

		case types.GENERATE_PASSWORD_TOKEN_FAILURE: {
			return {
				...state,
				loading: false,
				errors: payload,
			};
		}

		case types.CLEAR_SUCCESS: {
			return {
				...state,
				success: undefined,
			};
		}

		case types.CLEAR_ERRORS: {
			return {
				...state,
				errors: {},
			};
		}

		default:
			return state;
	}
};

export default ForgotPasswordReducer;
