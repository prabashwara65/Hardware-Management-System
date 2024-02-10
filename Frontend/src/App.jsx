import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import DashBoard from './Components/Dashboard//DashBoard';
import NavHome from './Components/Home/NavHome';

import InventoryHome from './Components/Inventory/InventoryHome';
import InventoryForm from './Components/Inventory/InventoryForm';
import SelectedItem from './Components/Inventory/SelectedItem';
import EditInventoryItems from './Components/Inventory/EditInventoryItems';

import { Provider } from 'react-redux';
import store from '../src/Components/ReduxTool/Store';



function App() {

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

        </Routes>

      </BrowserRouter>

    </Provider>




  );
}

export default App
