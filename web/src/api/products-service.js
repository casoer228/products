import { API_ROUTES } from '../constants';
import ApiService from './api-service';

class ProductsService extends ApiService {
  _route = API_ROUTES.products;

  _params = {
    limit: 20
  };

  _map(res) {
    return res.data.data.map(item => ({
      ...item,
      price: item.price / 100,
      weight: item.weight / 1000
    }));
  }
}

const productsService = new ProductsService();

export default productsService;
