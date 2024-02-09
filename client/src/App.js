import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ScheduleForm from './components/ScheduleForm/ScheduleForm';
import StaffList from './components/StaffList/StaffList';
import AvailableAgent from './components/AvailableAgent/AvailableAgent';
import StaffForm from './components/StaffForm/StaffForm';




const App = () => {

  let staffList = [];
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<ScheduleForm />}/>
          <Route path='/stafflist' element={<StaffList value={staffList} />} />
          <Route path='/staffform' element={<StaffForm />}/>
          <Route path='/availableagent' element={<AvailableAgent />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;