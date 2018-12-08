import { API_URL } from './api';

export const APPLICATION_JSON = 'application/json';
export const MULTIPART_FORM_DATA = 'multipart/form-data';

export function getOptions({ method, data, contentType }) {
  switch (contentType) {
    case MULTIPART_FORM_DATA:
      return {
        method,
        contentType: MULTIPART_FORM_DATA,
        data,
      };
    default:
      return {
        method,
        contentType: APPLICATION_JSON,
        data,
      };
  }
}

export function getPath({ model, id, url, query }) {
  let path = `${API_URL}/api/${model}/${id}/${url}/`;
  if (id === undefined) {
    path =
      url === undefined
        ? `${API_URL}/api/${model}/`
        : `${API_URL}/api/${model}/${url}/`;
  } else {
    path =
      url === undefined
        ? `${API_URL}/api/${model}/${id}/`
        : `${API_URL}/api/${model}/${id}/${url}/`;
  }
  path = query === undefined ? path : `${path}${query}`;
  return path;
}
