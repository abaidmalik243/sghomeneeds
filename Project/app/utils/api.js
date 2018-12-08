import axios from 'axios';

export function Api(path, options = { method: 'POST', data: {} }) {
  return axios({ url: path, ...options });
}

// export const API_URL = 'https://sghomeneeds-web.herokuapp.com';
export const API_URL = 'http://localhost:8000';
