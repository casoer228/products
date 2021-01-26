import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import ProductsSearchForm from './containers/ProductsSearchForm';
import ProductsStatistics from './containers/ProductsStatistics';
import ProductsGrid from './containers/ProductsGrid';

const App = () => {
  return (
    <Router>
      <div className="container my-5">
        <div className="row mb-5">
          <div className="col-12 col-md">
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Каталог</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/statistics">Статистика</Link>
            </li>
          </ul>
          </div>
          <div className="col">
            <ProductsSearchForm />
          </div>
        </div>
        <Switch>
          <Route path="/statistics">
            <ProductsStatistics />
          </Route>
          <Route path="/">
            <ProductsGrid />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
