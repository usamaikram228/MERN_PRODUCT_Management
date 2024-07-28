import React, { useEffect, useState } from "react";

const MyProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const auth = localStorage.getItem('user');
      let userid = JSON.parse(auth)._id;
      let result = await fetch(`http://localhost:5000/my-products/${userid}`);

      result = await result.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct=async(productId)=>{
    try{
      let result = await fetch(`http://localhost:5000/delete-product/${productId}`,{
        method:'DELETE',
      })
      if (result.status === 200) {
        // Filter out the deleted product and update the state.
        setProducts(products.filter(product => product._id !== productId));
      } else {
        console.error("Failed to delete product. Status code:", result.status);
      }
    }catch(error){
      console.error("Error Deleting product",error);
    }
  }

  return (
    <div className="height d-flex justify-content-center align-items-center">
      {products.map((product, index) => (
        <div className="card p-3" key={index}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="mt-2">
              <h4 className="text-uppercase">{product.company}</h4>
              <div className="mt-5">
                <h5 className="text-uppercase mb-0">{product.category}</h5>
                <h1 className="main-heading mt-0">{product.name}</h1>
              </div>
            </div>
            <div className="image">
              <img src={product.image} width="200" alt={product.name}></img>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
           
            <div className="colors">
              {/* {product.colors.map((color, colorIndex) => (
                <span key={colorIndex} style={{ backgroundColor: color }}></span>
              ))} */}
            </div>
          </div>

          <button className="btn btn-primary" onClick={() => deleteProduct(product._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default MyProducts;
