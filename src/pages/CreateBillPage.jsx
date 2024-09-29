import { Container, TextField, Button, Grid, Typography, Box, IconButton } from '@mui/material';
import { useState } from 'react';
import { createBill } from '../api/billApi';  // Import the createBill API
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';

const CreateBillPage = () => {
  const [bill, setBill] = useState({
    name: '', phoneno: '', adharno: '', address: '', state: '', date: '', paymentmode:'', items: [{ srno: '', itemname: '', quantity: '', hsncode: '', grossweight: '', purity: '', rate: '', hallmarkcharge: '' }]
  });

  const navigate= useNavigate();

  const handleChange = (e) => {
    setBill({ ...bill, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const items = [...bill.items];
    items[index][field] = value;
    setBill({ ...bill, items });
  };

  const addItemRow = () => {
    setBill({
      ...bill,
      items: [...bill.items, { srno: '', itemname: '', quantity: '', hsncode: '', grossweight: '', purity: '', rate: '', hallmarkcharge: '' }]
    });
  };

  const removeItemRow = (index) => {
    const items = bill.items.filter((_, i) => i !== index);
    setBill({ ...bill, items });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBill(bill);  // Call the API to create the bill
      alert('Bill created successfully');
      navigate(`/list`) 
    } catch (error) {
      console.error('Error creating bill', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Create Bill</Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Name" name="name" fullWidth onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Phone Number" name="phoneno" fullWidth onChange={handleChange} required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Adhar No." name="adharno" fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Address" name="address" fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="State" name="state" fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Date" name="date" fullWidth onChange={handleChange} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Payment Mode" name="paymentmode" fullWidth onChange={handleChange} />
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom>Items</Typography>
        {bill.items.map((item, index) => (
          <Grid container spacing={2} key={index} alignItems="center">
            <Grid item xs={12} sm={1}>
              <TextField label="Sr No." name="srno" fullWidth value={item.srno} onChange={(e) => handleItemChange(index, 'srno', e.target.value)} required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="Item Name" name="itemname" fullWidth value={item.itemname} onChange={(e) => handleItemChange(index, 'itemname', e.target.value)} required />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField label="Quantity" name="quantity" fullWidth value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} required />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField label="HSN Code" name="hsncode" fullWidth value={item.hsncode} onChange={(e) => handleItemChange(index, 'hsncode', e.target.value)} required />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField label="Gross Weight" name="grossweight" fullWidth value={item.grossweight} onChange={(e) => handleItemChange(index, 'grossweight', e.target.value)} required />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField label="Purity" name="purity" fullWidth value={item.purity} onChange={(e) => handleItemChange(index, 'purity', e.target.value)} required />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField label="Rate" name="rate" fullWidth value={item.rate} onChange={(e) => handleItemChange(index, 'rate', e.target.value)} required />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField label="Hallmark Charge" name="hallmarkcharge" fullWidth value={item.hallmarkcharge} onChange={(e) => handleItemChange(index, 'hallmarkcharge', e.target.value)} required />
            </Grid>
           
            <Grid item xs={12} sm={1}>
              <IconButton onClick={() => removeItemRow(index)} disabled={bill.items.length === 1}>
                <RemoveIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Button variant="outlined" color="primary" onClick={addItemRow} startIcon={<AddIcon />}>Add Item</Button>

        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">Submit</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateBillPage;
