import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useState } from 'react';

const ViewBillPage = () => {
  const [bills] = useState([
    // This will eventually be fetched from an API
    { name: 'John Doe', phoneno: '1234567890', adharno: '1234', items: [] },
  ]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>View Bills</Typography>
      <List>
        {bills.map((bill, index) => (
          <ListItem key={index}>
            <ListItemText primary={bill.name} secondary={`Phone: ${bill.phoneno}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ViewBillPage;
