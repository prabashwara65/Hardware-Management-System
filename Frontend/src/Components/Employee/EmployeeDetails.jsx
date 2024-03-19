import './employee.css'
import { Link } from 'react-router-dom';

const EmployeeDetails = ({ employee, onDelete  }) => {

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8000/employees/${employee._id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete employee');
            }
            // Call onDelete callback to update employee list
            onDelete(employee._id);
            alert('Employee deleted successfully');
        } catch (error) {
            console.error('Error deleting employee:', error);
            alert('Failed to delete employee');
        }
    };

    return(
        <div className="employeeDetails">
            <ul>
            <li>{employee.employeeid}</li>
            <li>{employee.fullname}</li>
            <li>{employee.email}</li>
            <li>{employee.jobPost}</li>
            <li>{employee.employmenttype}</li>
            <li><Link to={`/updateEmployee/${employee._id}`}>Update</Link></li>
            <li><button onClick={handleDelete}>Delete</button></li>
                
            </ul>
        </div>
    )
}

export default EmployeeDetails 


