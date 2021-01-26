const grid = Component => ({ items, isLoading }) => (
  <>
    {isLoading ? (
      <div className="d-table mx-auto my-5 py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    ) : (
      <div className="row">
        {items.map(item => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <Component {...item} />
          </div>
        ))}
      </div>
    )}
  </>
);

export default grid;
