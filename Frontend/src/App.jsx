import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import DashBoard from './Components/Dashboard//DashBoard';
import NavHome from './Components/Home/NavHome';

import InventoryHome from './Components/Inventory/InventoryHome';
import InventoryForm from './Components/Inventory/InventoryForm';
import SelectedItem from './Components/Inventory/SelectedItem';
import EditInventoryItems from './Components/Inventory/EditInventoryItems';

// import CusHome from './Components/Order/Home-Product';
// import CusSelectedItem from './Components/Order/Home-selectedItems';
// import CartPage from './Components/Order/cartPage';

import CusHome from './Components/Order/Home-Products'
import CusSelectedItem from './Components/Order/Home-SelectedItem'
import CartPage from './Components/Order/CartPages'
import DeliveryInfoPage from './Components/Order/DeliveryInfoPage';
import PaymentPage from './Components/Order/PaymentPage'
import AdminOrdersPage from './Components/Order/AdminOrderdPage'

import { Provider } from 'react-redux';
import store from '../src/Components/ReduxTool/Store';



function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (


    <Provider store={store}>
      <BrowserRouter>

        <Routes>

          <Route  path="/" element={<NavHome />} />
          <Route  path="/Register" element={<Register />} />
          <Route  path="/Login" element={<Login />} />
          <Route  path="/DashBoard" element={<DashBoard />} />

          <Route exact path="/inventory" element={<InventoryHome />} />
          <Route exact path="/addnewItem" element={<InventoryForm />} />
          <Route exact path="/selectedItem/:id" element={<SelectedItem />} />
          <Route exact path="/editItem/:id" element={<EditInventoryItems />} />

          <Route exact path="/cusHome" element={<CusHome addToCart={addToCart}/>} />
          <Route exact path='/cart' element={<CartPage cart={cart}/>}/>
          <Route exact path="/cusSelectedItem/:id" element={<CusSelectedItem  addToCart={addToCart}/>} />
          <Route exact path='/deliveryinfo' element={<DeliveryInfoPage />}/>
          <Route exact path='/payment' element={<PaymentPage />}/>
          <Route exact path='/order' element={<AdminOrdersPage />}/>
          
          


        </Routes>

      </BrowserRouter>

    </Provider>




  );
}

export default App
