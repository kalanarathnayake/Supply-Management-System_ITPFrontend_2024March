import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar.component";
import Footer from "./components/navbar/footer.component"
// supply
import AddPackage from './components/supply/add-supply.component';
import SupplyList from './components/supply/supply-list.component';
import EditPackage from './components/supply/supply-edit.component';
// product
import ProductList from './components/product/product-list.component';
import AddProduct from './components/product/add-product.component';
import EditProduct from './components/product/product-edit.component';

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route exact path="/nav" element={<Navbar />} />
          
          <Route exact path="/addSupply" element={<AddPackage />} />
          <Route exact path="/supply" element={<SupplyList />} />
          <Route exact path="/editPackage" element={<EditPackage />} />

          <Route exact path="/product" element={<ProductList />} />
          <Route exact path="/addProduct" element={<AddProduct />} />
          <Route exact path="/editProduct" element={<EditProduct />} />

        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;