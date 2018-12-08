import { fromJS } from 'immutable';
import { USERS } from '../actions/restApi';

// Initial routing state
const initialState = fromJS({
  user: {},
  LOAD_AUTH: {
    data: {
      merchantId: 0,
      userId: 0,
      consumerId: 0,
    },
  },
  loginError: {},
});

/**
 * Merge route into the global application state
 */
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case USERS.REGISTER.SUCCESS:
      return state.merge({
        user: action.payload,
      });
    case USERS.LOGIN.SUCCESS:
      return state.merge({
        user: action.payload,
      });
    case USERS.LOGIN.FAILED:
      return state.merge({
        loginError: action.payload,
      });
    case USERS.GET.SUCCESS:
      return state.merge({
        user: action.payload,
      });
    case USERS.PATCH.SUCCESS:
      return state.merge({
        user: action.payload,
      });
    case USERS.LOAD_AUTH.SUCCESS:
      return state.merge({
        LOAD_AUTH: action.payload,
      });
    default:
      return state;
  }
}
