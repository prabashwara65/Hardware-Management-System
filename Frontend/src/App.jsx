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

import EmployeeHome from './Pages/EmployeeHome';
import EmployeeForm from './Components/Employee/EmployeeForm';
import UpdateEmployeeForm from './Components/Employee/UpdateEmployeeForm';


import LeaveHome from './Pages/LeaveHome';
import EmployeeReq from './Pages/EmployeeReq';
import LeaveForm from './Components/Leave/LeaveForm';

import EmpDashboard from './Pages/EmpDashboard';




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

          <Route exact path="/employee" element={<EmployeeHome />} />
          <Route exact path="/addNewEmployee" element={<EmployeeForm />} />
          <Route exact path="/updateEmployee/:id" element={<UpdateEmployeeForm />} />
          <Route exact path="/leaveRequest" element={<LeaveHome />} />
          <Route exact path="/employeereq" element={<EmployeeReq />} />
          <Route exact path="/addNewLeave" element={<LeaveForm />} />

          <Route exact path="/EmpDash" element={<EmpDashboard/>} />
         
          

        </Routes>

      </BrowserRouter>

    </Provider>




  );
}

export default App
