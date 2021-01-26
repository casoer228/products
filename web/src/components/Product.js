const Product = ({ title, imageURL, price, weight, webURL }) => (
  <div className="d-flex flex-column h-100 shadow">
    <div className="bg-image" style={{ backgroundImage: `url(${imageURL})` }}></div>
    <div className="d-flex flex-grow-1 flex-column justify-content-between p-3">
      <h3 className="h6">{title}</h3>
      <div>
        <div className="row align-items-center">
          <div className="col">
            <strong className="text-primary">{price}</strong> грн
          </div>
          <div className="col-auto small">
            <strong>{weight}</strong> кг
          </div>
        </div>
      </div>
    </div>
    <a
      className="btn btn-primary rounded-0 d-block mt-n2"
      href={webURL}
      target="_blank"
    >Перейти в магазин</a>
  </div>
);

export default Product;
