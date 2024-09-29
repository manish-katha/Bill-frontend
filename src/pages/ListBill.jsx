import React, { useState, useEffect } from "react";
import { getBills } from "../api/billApi"; // Import API call function
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

const BillList = () => {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bills whenever the search term changes or when the component mounts
  useEffect(() => {
    const fetchBills = async () => {
      setLoading(true);
      try {
        const data = await getBills(searchTerm); // If searchTerm is empty, it will fetch all bills
        const sortedBills = data.tasks.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        ); // Sort by date, newest first
        setBills(sortedBills);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, [searchTerm]);

  // Handle input change for phone number search
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update searchTerm state, which will trigger useEffect
  };

  // Function to calculate total amount for a bill based on its items
  const calculateTotalAmount = (items) => {
    return items
      .reduce((total, item) => {
        const weight = parseFloat(item.grossweight) || 0;
        const rateValue = parseFloat(item.rate) || 0;
        const hallmarkValue = parseFloat(item.hallmarkcharge) || 0;
        const itemTotal = weight * rateValue + hallmarkValue;
        return total + itemTotal; // Sum the total for all items
      }, 0)
      .toFixed(2); // Returns the total rounded to 2 decimals
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Bill List
      </Typography>

      {/* Search input */}
      <TextField
        label="Search by phone number"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />

      {/* Bill Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Phone Number</strong>
              </TableCell>
              <TableCell>
                <strong>Create Date</strong>
              </TableCell>
              <TableCell>
                <strong>Total Amount</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.length > 0 ? (
              bills.map((bill) => (
                <TableRow key={bill._id}>
                  <TableCell>{bill.name}</TableCell>
                  <TableCell>{bill.phoneno}</TableCell>
                  <TableCell>
                    {new Date(bill.date).toLocaleDateString()}
                  </TableCell>

                  {/* Calculate total amount for the bill based on its items */}
                  <TableCell>${calculateTotalAmount(bill.items)}</TableCell>

                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<VisibilityIcon />}
                      style={{ marginRight: "10px" }}
                      onClick={() => navigate(`/view-bills/${bill._id}`)} // Navigate to the invoice page
                    >
                      View
                    </Button>
                    
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No bills found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BillList;
