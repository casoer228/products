import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import grid from '../hocs/grid';
import Product from '../components/Product';
import productsService from '../api/products-service';

const Grid = grid(Product);

const ProductsGrid = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get('q');
  const sort = urlParams.get('sort');

  useEffect(() => {
    setIsLoading(true);

    productsService.get({ q, sort })
      .then(setProducts)
      .finally(() => setIsLoading(false));
  }, [location]);

  return <Grid items={products} isLoading={isLoading} />;
};

export default ProductsGrid;
