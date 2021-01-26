import { useHistory } from 'react-router-dom';
import SearchForm from '../components/SearchForm';

const ProductsSearchForm = () => {
  const history = useHistory();

  const search = q => {
    history.push(`/?q=${q}`);
  };

  return <SearchForm search={search} />;
};

export default ProductsSearchForm;
