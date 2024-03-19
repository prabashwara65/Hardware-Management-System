import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import DashBoard from "./Components/Dashboard//DashBoard";
import NavHome from "./Components/Home/NavHome";

import InventoryHome from './Components/Inventory/InventoryHome';
import InventoryForm from './Components/Inventory/InventoryForm';
import SelectedItem from './Components/Inventory/SelectedItem';
import EditInventoryItems from './Components/Inventory/EditInventoryItems';
import CusHome from './Components/Home/Home-Products';
import CusSelectedItem from'./Components/Home/Home-SelectedItem';
import Report1 from './Components/Inventory/Inventory-report1';
import InventoryHome from "./Components/Inventory/InventoryHome";
import InventoryForm from "./Components/Inventory/InventoryForm";
import SelectedItem from "./Components/Inventory/SelectedItem";
import EditInventoryItems from "./Components/Inventory/EditInventoryItems";

import { Provider } from "react-redux";
import store from "../src/Components/ReduxTool/Store";

// sanjuka
import RentalManagement from "./Components/RentalManagement/RentalManagement";
import LendedItemsList from "./Components/RentalManagement/lendedItem/LendedItemList";
import UserItemList from "./Components/RentalManagement/UserItemList/UserItemList";
// import SearchBar from "./Components/RentalManagement/searchBar/searchBar";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavHome />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/DashBoard" element={<DashBoard />} />

          <Route exact path="/inventory" element={<InventoryHome />} />
          <Route exact path="/addnewItem" element={<InventoryForm />} />
          <Route exact path="/selectedItem/:id" element={<SelectedItem />} />
          <Route exact path="/editItem/:id" element={<EditInventoryItems />} />

          {/* sanjuka - routes */}
          <Route path="/rentalService" element={<RentalManagement />} />
          <Route path="/lendedItems" element={<LendedItemsList />} />
          <Route path="/userItemList" element={<UserItemList />} />
          <Route exact path="/cusHome" element={<CusHome />} />
          <Route exact path="/cusSelectedItem/:id" element={<CusSelectedItem />} />
          <Route exact path="/report1" element={<Report1 />} />

          <Route
            path="/supply-management/*"
            element={
              <Layout>
                <Routes>
                  <Route index element={<SupplyManagementHome />} />
                  <Route path="notifications" element={<NotificationPage />} />
                  <Route path="notifications/:id" element={<NotificationDetails />} />
                  <Route path="supplier-management" element={ <SupplierList /> } />
                  <Route path="purchase-orders" element={ <SupplierList /> } />
                  <Route path="return-management" element={ <SupplierList /> } />
                  <Route path="reports" element={ <SupplierList /> } />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
