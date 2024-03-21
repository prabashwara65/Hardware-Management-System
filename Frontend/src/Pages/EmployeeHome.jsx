import { useEffect , useState} from "react"


import '../Components/Employee/employee.css'

import Navibar from "../Components/Employee/Navibar"
import EmployeeDetails from "../Components/Employee/EmployeeDetails"
import AddBoxIcon from '@mui/icons-material/AddBox';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";






const EmployeeHome = () => {

    const [employees, setEmployees] = useState(null)
    const [searchQuery, setSearchQuery] = useState('');
 
   

    useEffect(() =>  {
        const fetchEmployees = async () => {
        const response = await fetch('http://localhost:8000/employees')
        const json = await response.json()
      

        if (response.ok){
            setEmployees(json)
        }
    }

    fetchEmployees()
}, []);


        // Function to handle search query changes
        const handleSearchInputChange = (e) => {
            setSearchQuery(e.target.value);
          };


          
    return (
        <div className="fullbody">
            <Navibar/>
            <div>
            <div >
                <div className="sear"><SearchIcon/></div>
        <IconButton size="large"  color="inherit" href="/addNewEmployee" className='addBtn'>
          <Badge  color="error">
          <AddBoxIcon/>
          </Badge>
        </IconButton></div>
            <div className="addNew">Add New Employee</div>
            <div className="search">
            <input
                    type="text"
                    placeholder="Search by Employee ID"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            <div className="titles">
                <ul>
                    <li><strong>Employee id</strong></li>
                    <li><strong>Full Name</strong></li>
                    <li><strong>Email</strong></li>
                    <li><strong>Job Post</strong></li>
                    <li><strong>Employee type</strong></li>
                   
                </ul>
                
            </div>
         

            
            </div>
            <div className="details">
        
            {employees &&
          employees
            .filter((employee) =>
              employee.employeeid.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((employee) => (
              <EmployeeDetails key={employee._id} employee={employee} />
            ))}
              
            </div>
            </div>
    )
   
}


export default EmployeeHome