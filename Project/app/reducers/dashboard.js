import { fromJS } from 'immutable';
import { getActionModel, LISTINGS, MODEL_MAP } from '../actions/restApi';

export const DASHBOARD_VIEW = 'dashboard';

const initialState = fromJS({
  [LISTINGS.MODEL]: {
    LIST: {
      count: 2112,
      next: 'http://localhost:8000/api/listings/?limit=10&offset=10',
      previous: null,
      results: [],
    },
    GET: {},
    POST: {},
  },
});

export default function modelReducer(state = initialState, action) {
  const model = getActionModel(action.type);
  if (model !== LISTINGS.MODEL) {
    return state;
  }
  switch (action.type) {
    case MODEL_MAP[model].LIST.SUCCESS:
      return state.merge({
        [model]: {
          LIST: action.payload,
        },
      });
    case MODEL_MAP[model].GET.SUCCESS:
    case MODEL_MAP[model].PUT.SUCCESS:
    case MODEL_MAP[model].PATCH.SUCCESS:
      return state.merge({
        [model]: {
          GET: action.payload,
        },
      });
    case MODEL_MAP[model].POST.SUCCESS:
      return state.merge({
        [model]: {
          POST: action.payload,
        },
      });
    default:
      return state;
  }
}
