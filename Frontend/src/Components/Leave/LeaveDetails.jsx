

import './leave.css'

const LeaveDetails = ({ leave }) => {

    const handleReject = async () => {
        try {
            const response = await fetch(`http://localhost:8000/leaves/${leave._id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to reject leave Requests');
            }
            // Call onDelete callback to update employee list
            onDelete(leave._id);
            alert('Leave Request Rejected successfully');
        } catch (error) {
            console.error('Error Rejectinging leave request:', error);
            alert('Failed to delete leave Request');
        }
    };
    
    return(
        <div className="leaveDetails">
        <ul>
        <li>{leave.employeeid}</li>
        <li>{leave.leaveType}</li>
        <li>{leave.startDate}</li>
        <li>{leave.endDate}</li>
        <li>{leave.reason}</li>
        <li><button onClick={handleReject}>Reject</button></li>
        </ul>
        </div>
    )
}

export default LeaveDetails 