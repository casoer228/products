import { useEffect, useState } from 'react';
import productsHistoryService from '../api/products-history-service';
import Chart from '../components/Chart';

const ProductsStatistics = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    productsHistoryService.get()
      .then(items => {
        const labels = [];
        const data = [];

        items.forEach(item => {
          labels.push(item.createdAt);
          data.push(item.price / 100);
        });

        setData({
          labels,
          datasets: [{
            label: 'Ціна на гречану крупу',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data
          }]
        });
      });
  }, []);

  return <Chart data={data} />;
};

export default ProductsStatistics;
