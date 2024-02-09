import React, { useEffect, useState } from 'react';
import StaffList from '../StaffList/StaffList';
import { Grid, TextField, Button } from '@mui/material';
import axios from 'axios';





const ScheduleForm = () => {

    const [formData, setFormData] = useState({
        day: '', time: '',
    });

    const fetchData = async () => {
        const res = await axios.get(`http://localhost:5003/agentByTime?day=${formData.day}&time=${formData.time}`);
        if(res.data.length == 0){
            setStaffList([]);
        }
        else setStaffList(res.data);
        setAvailableAgent(true);
        console.log(res.data);
    }

    const [availableAgent, setAvailableAgent] = useState(false);
    const [staffList, setStaffList] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const GetAgent = async () => {
        await fetchData();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("formdata", formData);
        setAvailableAgent(false);
        await GetAgent();
        // fetch data from ApI and set 
        setAvailableAgent(true);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField fullWidth label="day" name='day' value={formData.day} onChange={(e) => handleChange(e)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="time" name='time' value={formData.time} onChange={(e) => handleChange(e)} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant='contained' color='primary'>Search Staff</Button>
                    </Grid>
                </Grid>
            </form>
            {
                availableAgent && <StaffList staffList={staffList} user={false} />
            }
        </div>
    )
}

export default ScheduleForm;