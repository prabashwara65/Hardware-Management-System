import { Link } from 'react-router-dom'

const Navibar =  () => {
    return(
        <header>
            <div className="#">
                <Link to="/">
                    <h1>Laeve details</h1>
                </Link>
                <a href="/acceptedleaveRequest" className="leaveReq">accepted Leave Requests</a>
            </div>
        </header>
    )
}

export default Navibar