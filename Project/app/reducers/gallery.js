import { fromJS } from 'immutable';
import { isEqual } from 'lodash';
import { CATEGORIES, GALLERIES } from '../actions/restApi';
// import { galleries } from '../containers/GalleryPage/data';
import categories from '../containers/Common/categories.json';

const initialState = fromJS({
  galleries: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  }, // TODO: replace with galleries: [] when not using stub data
  categories,
});

export const GALLERY_VIEW = 'gallery';

export default function blogPostReducer(state = initialState, action) {
  if (!isEqual(action.view, GALLERY_VIEW)) return state;
  switch (action.type) {
    case CATEGORIES.LIST.SUCCESS:
      return state.merge({
        categories: action.payload,
      });
    case GALLERIES.LIST.SUCCESS:
      return state.merge({
        galleries: action.payload,
      });
    default:
      return state;
  }
}
