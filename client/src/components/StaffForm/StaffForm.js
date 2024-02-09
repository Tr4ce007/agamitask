import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const StaffForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name:"",
        email:'',
        availableDay:'',
        availableFrom:'',
        availableTo:''
    });

    const PostAgent = async () => {
        try {
            // upload detaial axios  
            const obj ={};
            obj.name=formData.name;
            obj.email=formData.email;
            obj.availableDay=formData.availableDay;
            obj.availableFrom=parseInt(formData.availableFrom);
            obj.availableTo=parseInt(formData.availableTo);      
            
            console.log(obj);
            const url = `http://localhost:5003/createAgent`;
            const resp = await axios.post(url,obj);
            alert("Data Added Successfully.")
        } catch (error) {
            alert(error.message);
        }
    }

    const handleChange=(e) =>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        PostAgent();
        navigate("/stafflist");
    }
  return (
    <form onSubmit={handleSubmit}>
        <Grid container spacing = {2}>
            <Grid item xs = {12}>
                <TextField fullWidth label = "name" name='name' value={formData.name} onChange={(e) => handleChange(e)}/>
            </Grid>
            <Grid item xs = {12}>
                <TextField fullWidth label = "email" name='email' value={formData.email} onChange={(e) => handleChange(e)}/>
            </Grid>
            <Grid item xs = {12}>
                <TextField fullWidth label = "availableDay" name='availableDay' value={formData.availableDay} onChange={(e) => handleChange(e)}/>
            </Grid>
            <Grid item xs = {12}>
                <TextField fullWidth label = "availableFrom" name='availableFrom' value={formData.availableFrom} onChange={(e) => handleChange(e)}/>
            </Grid>
            <Grid item xs = {12}>
                <TextField fullWidth label = "availableTo" name='availableTo' value={formData.availableTo} onChange={(e) => handleChange(e)}/>
            </Grid>
            <Grid item xs = {12}>
                <Button type='submit' variant='contained' color='primary'>Save</Button>
            </Grid>
        </Grid>
    </form>
  )
}

export default StaffForm;