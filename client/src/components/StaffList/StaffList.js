import React, { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditForm from '../EditForm/EditForm';
import axios from 'axios';


const StaffList = ({ staffList = [], user = true }) => {
    const getAgents = async () => {
        const res = await axios.get('http://localhost:5003/agents');
        setList(res.data.data);
    }

    useEffect(() => {
        if (user) {
            getAgents();
        }
    }, [user]);

    const [list, setList] = useState(staffList);



    const [isEditing, setIsEditing] = useState(false);
    const [editedStaff, setEditedStaff] = useState(null);

    const onEdit = (staffid) => {
        // toggle is editing
        const staffToEdit = list.find((staff) => staff._id === staffid);
        setEditedStaff(staffToEdit);
        setIsEditing(true);
    }

    const onDelete = async (staffid) => {
        try {
            const url = `http://localhost:5003/deleteAgent/${staffid}`;
            axios.delete(url);
            alert("Deleted Successfully");
            //id and all and then delete
            getAgents();
        } catch (error) {
            console.log(error);
            alert("Something is wrong.")
        }
    }

    const onCancelEdit = () => {
        setEditedStaff(null);
        setIsEditing(false);
    }

    const UpdateAgent = async(editedData) => {
        console.log(editedData);
        const obj = {};
        obj.name = editedData.name;
        obj.email = editedData.email;
        obj.availableDay = editedData.availableDay;
        obj.availableFrom = parseInt(editedData.availableFrom);
        obj.availableTo = parseInt(editedData.availableTo);
        obj._id = editedData._id;

        console.log(obj);
        const url = `http://localhost:5003/updateAgent/${obj._id}`;
        const resp = await axios.put(url,obj);
        console.log(resp);
    }

    const onSaveEdit = async (editedData) => {

        await UpdateAgent(editedData);

        alert("Data Added Successfully.")

        setEditedStaff(null);
        setIsEditing(false);
        getAgents();

    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>email</TableCell>
                        <TableCell>From (Time)</TableCell>
                        <TableCell>To (Time)</TableCell>
                        <TableCell>Day(Week)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list.map((staff) => (
                        <TableRow key={staff._id}>
                            <TableCell>{staff.name}</TableCell>
                            <TableCell>{staff.email}</TableCell>
                            <TableCell>{staff.availableFrom}</TableCell>
                            <TableCell>{staff.availableTo}</TableCell>
                            <TableCell>{staff.availableDay}</TableCell>
                            {user && <TableCell>
                                <Button variant='outlined' color='primary' style={{ marginRight: '8px' }} onClick={() => onEdit(staff._id)}>Edit</Button>
                                <Button variant='outlined' color='secondary' onClick={() => onDelete(staff._id)}>Delete</Button>
                            </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isEditing && (
                <Box mt={5} border={1} p={5} borderColor='primary.main'>
                    <EditForm staff={editedStaff} onCancel={onCancelEdit} onSave={onSaveEdit} />
                </Box>
            )}
        </TableContainer>
    )
}

export default StaffList