import React from 'react';


const AvailableAgent = ({ agent }) => {
    return (
        <div>
            <h2>Available Agent</h2>
            <p>
                <strong>Name:</strong>{agent.name}
            </p>
            <p>
                <strong>Email:</strong>{agent.email}
            </p>
        </div>    
  )
}

export default AvailableAgent;