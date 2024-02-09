import React, { useState } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import axios from 'axios';

const EditForm = ({staff,onCancel, onSave}) => {
    const [formData , setFormData] = useState(staff);
    
    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleSave = async () => {
        try{
            // upload data axios
            onSave(formData);
        }catch(error){
            console.log(error);
        }
    }


  return (
    <form>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField fullWidth label='name' name='name' value={formData.name} onChange={(e) => handleChange(e)} />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label='email' name='email' value={formData.email} onChange={(e) => handleChange(e)} />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label='availableDay' name='availableDay' value={formData.availableDay} onChange={(e) => handleChange(e)} />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label='availableFrom' name='availableFrom' value={formData.availableFrom} onChange={(e) => handleChange(e)} />
            </Grid>
            <Grid item xs={12}>
                <TextField fullWidth label='availableTo' name='availableTo' value={formData.availableTo} onChange={(e) => handleChange(e)} />
            </Grid>
            <Grid item xs={12}>
                <Button variant='contained' onClick={handleSave} style={{margin:"5px"}}>Save</Button>
                <Button variant='contained' onClick={onCancel}>Cancel</Button>
            </Grid>
        </Grid>
    </form>
  )
}

export default EditForm