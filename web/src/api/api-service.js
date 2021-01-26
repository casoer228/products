import axios from 'axios';
import { API_URL } from '../constants';

class ApiService {
  _params = {};

  get(params = {}) {
    const _params = {
      ...this._params,
      ...params
    };

    return axios.get(API_URL + this._route, { params: _params }).then(this._map);
  }

  _map(res) {
    return res;
  }
}

export default ApiService;
