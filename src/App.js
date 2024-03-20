import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/navbar.component";
import Footer from "./components/navbar/footer.component"
import AddPackage from './components/package/add-supply.component';
import SupplyList from './components/package/supply-list.component';
import EditPackage from './components/package/package-edit.component';

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
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;