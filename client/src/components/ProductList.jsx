// client/src/components/ProductList.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = ({ products, deleteProduct, fetchProducts }) => {
  const navigate = useNavigate();

  const editProduct = (id) => {
    navigate(`/edit-product/${id}`);
  }
  useEffect(() => {
    fetchProducts();
  }, [])
  return (
    <div>
      <div className='justify-between flex'>
        <h2 className="text-xl font-bold mb-2">Product List</h2>
        <Link to="/add-product" className="bg-blue-500 text-white px-2 py-1 rounded">
          Add Product
        </Link>
      </div>
      <table className="table-auto mt-10 w-full">
        <thead>
          <tr>
            <th className="px-4 border  py-2">Name</th>
            <th className="px-4 border  py-2">Description</th>
            <th className="px-4 border  py-2">Price</th>
            <th className="px-4 border  py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.length ?
            products.map((product) => (
              <tr key={product._id}>
                <td className="border px-4 py-2 text-center">{product.name}</td>
                <td className="border px-4 py-2 text-center">{product.description}</td>
                <td className="border px-4 py-2 text-center">${product.price}</td>
                <td className="border px-4 py-2 flex flex-nowrap justify-center">
                <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => editProduct(product._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 ms-2 py-1 rounded"
                    onClick={() => deleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )) :
            <td className="border px-4 py-2 text-center" rowSpan={10} colSpan={10}>No Data Found</td>


          }
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
