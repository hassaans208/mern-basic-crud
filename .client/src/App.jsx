// client/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import UserList from './pages/UserList';
import ProductList from './pages/ProductList';

const App = () => {
  // State and useEffect hooks
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchProducts();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
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
    <Router>
      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-4">MERN Blog App</h1>

        <div className="flex mb-4">
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

        <Switch>
          <Route path="/users">
            <UserList users={users} fetchUsers={fetchUsers} deleteUser={deleteUser} />
          </Route>
          <Route path="/products">
            <ProductList products={products} fetchProducts={fetchProducts} deleteProduct={deleteProduct} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
