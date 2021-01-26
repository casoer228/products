import { API_ROUTES } from '../constants';
import ApiService from './api-service';

class ProductsHistoryService extends ApiService {
  _route = API_ROUTES.productsHistory;

  _map(res) {
    return res.data.data;
  }
}

const productsHistoryService = new ProductsHistoryService();

export default productsHistoryService;
