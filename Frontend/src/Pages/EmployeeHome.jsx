import { useEffect , useState} from "react"


import '../Components/Employee/employee.css'

import Navibar from "../Components/Employee/Navibar"
import EmployeeDetails from "../Components/Employee/EmployeeDetails"
// import Notification from '../Components/Employee/Notification';




const EmployeeHome = () => {

    const [employees, setEmployees] = useState(null)
    const [searchQuery, setSearchQuery] = useState('');
    // const [showNotification, setShowNotification] = useState(false);
   

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


        //   const handleNotificationClick = () => {
        //     setShowNotification(false);
        //   };


    return (
        <div className="fullbody">
            <Navibar/>
            <div>
            <a href="/addNewEmployee" className="addEmp">Add Employee</a>
            
            {/* Adding the Search Box */}
            <input
                    type="text"
                    placeholder="Search by Employee ID"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            <div className="titles">
                <ul>
                    <li><strong>Employee id</strong></li>
                    <li><strong>Full Name</strong></li>
                    <li><strong>Email</strong></li>
                    <li><strong>Job Post</strong></li>
                    <li><strong>Employee type</strong></li>
                   
                </ul>
                
            </div>
            {/* {showNotification && <p>New Leave Request Notification</p>}
            <Notification onClick={handleNotificationClick} /> */}

            
            </div>
            <div className="details">
            {/* Rendering Filtered Employees */}
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