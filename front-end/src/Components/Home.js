import React, { useEffect, useState } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getPrducts();
  }, []);
  const getPrducts = async () => {
    let result = await fetch("http://localhost:5000/get-products");
    result = await result.json();
    //console.log(result.image)
    setProducts(result);
  }
  //console.log(products.image);
  //console.log('Usama');
  return (
    <div className="home-container">
      <h1>This is home page</h1>
      <div className="product-list">
        {products.map(product => (

          <div key={product.id} className="product">
            {product.image && product.image.data ? (
              <div className="product-image">
                 <img
                  src={product.image.dataURL} // Use the dataURL property
                  alt={product.name}
                />
              </div>
            ) : (
              <div className="product-image">No Image Available</div>
            )}
            <div className="product-description">
              <h3>{product.name}</h3>
              <p>Company: {product.company}</p>
              <p>Category: {product.category}</p>
              <p>Price: ${product.price}</p>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Home;