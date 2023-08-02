// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import UserList from './components/UserList';
import ProductList from './components/ProductList';
import AddEditProduct from './components/AddEditProduct';
import AddEditUser from './components/AddEditUser';

const App = () => {
  // State and useEffect hooks
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  axios.defaults.baseURL = `http://localhost:5000`

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data.data);
      console.log(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchUsers(); // Fetch users after deleting a user
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchProducts(); // Fetch products after deleting a product
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="mx-auto app h-[100vh]">
      <Router>
        <div className='flex flex-row bg-black py-4 px-4 justify-between align-middle items-center'>

          <h1 className="text-3xl font-bold text-white">MERN Blog App</h1>

          <div className="flex">
            <div className="mr-4">
              <Link to="/" className="bg-gray-500 text-white px-2 py-1 rounded">
                Home
              </Link>
            </div>
            <div className="mr-4">
              <Link to="/users" className="bg-blue-500 text-white px-2 py-1 rounded">
                Users
              </Link>
            </div>
            <div>
              <Link to="/products" className="bg-blue-500 text-white px-2 py-1 rounded">
                Products
              </Link>
            </div>
          </div>
        </div>
        <div className="mx-auto w-1/2 place-self-center mt-20 place-content-center self-center place-items-center">

        <Routes>

          <Route path="/" element={'Please Navigate Around'} />
          <Route path="/users" element={<UserList users={users} fetchUsers={fetchUsers} deleteUser={deleteUser} />} />
          <Route path="/products" element={<ProductList products={products} fetchProducts={fetchProducts} deleteProduct={deleteProduct} />} />
          <Route path="/add-product" element={<AddEditProduct fetchProducts={fetchProducts} />} />
          <Route path="/add-user" element={<AddEditUser fetchUsers={fetchProducts} />} />
          <Route path="/edit-product/:id" element={<AddEditProduct fetchProducts={fetchProducts} />} />
          <Route path="/edit-user/:id" element={<AddEditUser fetchUsers={fetchProducts} />} />
        </Routes>
        </div>

      </Router>
    </div>
  );
};

export default App;
