import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { getBillbyid } from "../api/billApi";
import logo from "../assets/rs.jpeg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useLocation } from "react-router-dom";

const Invoice = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bill, setBill] = useState(null);
  const invoiceRef = useRef();
  const location = useLocation(); // Get location to access state

  useEffect(() => {
    const fetchBill = async () => {
      setLoading(true);
      try {
        const { task } = await getBillbyid(id);
        setBill(task);

        // If navigating from BillList with download flag, call downloadPDF
        if (location.state && location.state.download) {
          downloadPDF();
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [id, location.state]); 

  const calculateTotalAmount = () => {
    if (!bill || !bill.items) return 0;
    return bill.items.reduce((total, item) => {
      return total + (item.rate * 1.13 * item.grossweight + item.hallmarkcharge);
    }, 0);
  };

  const downloadPDF = async () => {
    const element = invoiceRef.current;

    // Create a canvas from the element
    const canvas = await html2canvas(element, {
        scale: 2, // Keep scale for better quality
        useCORS: true,
        backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    // A4 dimensions in pixels (72 DPI)
    const a4Width = 595; // A4 width
    const a4Height = 842; // A4 height

    // Calculate scaling based on A4 size
    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [a4Width, a4Height],
    });

    // Calculate image dimensions to maintain aspect ratio
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Determine scale factor to fit the image within A4 dimensions
    const widthScale = a4Width / imgWidth;
    const heightScale = a4Height / imgHeight;
    const scaleFactor = Math.min(widthScale, heightScale); // Choose the smaller scale to fit within A4

    // Calculate new dimensions
    const newWidth = imgWidth * scaleFactor;
    const newHeight = imgHeight * scaleFactor;

    // Add image to PDF
    pdf.addImage(imgData, "PNG", 0, 0, newWidth, newHeight);

    // Save the PDF
    pdf.save("invoice.pdf");
    
};


  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography variant="h6" color="error">Error: {error}</Typography>;
  if (!bill) return <Typography variant="h6">No bill data available</Typography>;

  const items = bill.items || [];

  return (
    <>
      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: "20px", padding: "10px 30px", boxShadow: 2 }}
          onClick={downloadPDF}
        >
          Download PDF
        </Button>
      </Box>
      <Box
        ref={invoiceRef}
        sx={{
          padding: "30px",
          border: "1px solid #ccc",
          maxWidth: "800px",
          margin: "0 auto",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#333" }}>
              R S Jewellers
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              GSTIN: 09ARQPV2257D1ZC
            </Typography>
          </Box>
          <img src={logo} alt="Logo" width="100" />
        </Box>

        {/* Bill To Section */}
        <Box mt={4} mb={2}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>BILL TO:</Typography>
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Box>
              <Typography>Customer Name: {bill.name}</Typography>
              <Typography>Mobile No: {bill.phoneno}</Typography>
              <Typography>Date: {new Date(bill.date).toLocaleDateString()}</Typography>
              <Typography>Aadhar No: {bill.adharno}</Typography>
            </Box>
            <Box>
              <Typography>Address: {bill.address}</Typography>
              <Typography>State: {bill.state}</Typography>
              <Typography>Payment Mode: {bill.paymentmode}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Items Section */}
        <Table sx={{ borderCollapse: "collapse", width: "100%", marginTop: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ borderBottom: "1px solid #ccc", fontWeight: "bold" }}>Sr No</TableCell>
              <TableCell sx={{ borderBottom: "1px solid #ccc", fontWeight: "bold" }}>Item Name</TableCell>
              <TableCell sx={{ borderBottom: "1px solid #ccc", fontWeight: "bold" }}>HSN NO</TableCell>
              <TableCell sx={{ borderBottom: "1px solid #ccc", fontWeight: "bold" }}>Quantity</TableCell>
              <TableCell sx={{ borderBottom: "1px solid #ccc", fontWeight: "bold" }}>Net Wt. (gm)</TableCell>
              <TableCell sx={{ borderBottom: "1px solid #ccc", fontWeight: "bold" }}>Wastage</TableCell>
              <TableCell sx={{ borderBottom: "1px solid #ccc", fontWeight: "bold" }}>Purity</TableCell>
              <TableCell sx={{ borderBottom: "1px solid #ccc", fontWeight: "bold" }}>Rate</TableCell>
              <TableCell sx={{ borderBottom: "1px solid #ccc", fontWeight: "bold" }}>Hallmark Charges</TableCell>
              <TableCell sx={{ borderBottom: "1px solid #ccc", fontWeight: "bold" }}>Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  No items available
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.srno}</TableCell>
                  <TableCell>{item.itemname}</TableCell>
                  <TableCell>{item.hsncode}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.grossweight}</TableCell>
                  <TableCell>13%</TableCell>
                  <TableCell>{item.purity}</TableCell>
                  <TableCell>{item.rate}</TableCell>
                  <TableCell>{item.hallmarkcharge}</TableCell>
                  <TableCell>
                    {(item.rate * 1.13 * item.grossweight + item.hallmarkcharge).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Total Section */}
        <Box mt={4}>
          <Box display="flex" justifyContent="space-between" sx={{ fontWeight: "bold" }}>
            <Typography>CGST 1.5%</Typography>
            <Typography>Total CGST Amt: {(calculateTotalAmount() * 0.015).toFixed(2)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" sx={{ fontWeight: "bold" }}>
            <Typography>SGST 1.5%</Typography>
            <Typography>Total SGST Amt: {(calculateTotalAmount() * 0.015).toFixed(2)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" sx={{ fontWeight: "bold" }}>
            <Typography>Total GST Tax:</Typography>
            <Typography>{(calculateTotalAmount() * 0.03).toFixed(2)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" sx={{ fontWeight: "bold" }}>
            <Typography>Total Amount Before Tax:</Typography>
            <Typography>{calculateTotalAmount().toFixed(2)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" sx={{ fontWeight: "bold" }}>
            <Typography>Total Amount:</Typography>
            <Typography>{(calculateTotalAmount() * 1.03).toFixed(2)}</Typography>
          </Box>
        </Box>

        {/* Footer */}
        <Box mt={4} sx={{ borderTop: "1px solid #ccc", paddingTop: 2 }}>
          {/* <Typography>
            Amount in Words: One Lakh Ten Thousand Seven Hundred Seventy-Six Rupees Only
          </Typography> */}
          <Typography>Customer Sign:</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Invoice;
