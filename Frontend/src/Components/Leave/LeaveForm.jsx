import  { useState } from "react"

const LeaveForm = () => {
    const [employeeid, setEmployeeid] = useState('')
    const [leaveType, setLeaveType] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [reason, setReason] = useState('')
    const [error, setError] = useState(null)
   

    const handleLeaveForm = async (e) => {

        e.preventDefault()

        const leave = {employeeid,leaveType,startDate,endDate,reason}

        const response = await fetch('http://localhost:8000/leaves', {
            method: 'POST',
            body: JSON.stringify(leave),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setEmployeeid('')
            setLeaveType('')
            setStartDate('')
            setEndDate('')
            setReason('')
            setError(null)
            console.log('new leave request sent', json)
        }
    }



    return (
        <form onSubmit={handleLeaveForm}>
            <h3>Add a New Leave Request</h3>

            <lable>Employee ID:(EmXXX)</lable>
            <input type="text" onChange={(e) => setEmployeeid(e.target.value)} value={employeeid}/>

            <lable>Leave Type:</lable>
            <input type="text" onChange={(e) => setLeaveType(e.target.value)} value={leaveType}/>

            <lable>Start Date:</lable>
            <input type="date" onChange={(e) => setStartDate(e.target.value)} value={startDate}/>

            <lable>End Date:</lable>
            <input type="date" onChange={(e) => setEndDate(e.target.value)} value={endDate}/>

            <lable>Reason:</lable>
            <input type="text" onChange={(e) => setReason(e.target.value)} value={reason}/>

            <button>Send Request</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default LeaveForm