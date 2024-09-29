import { Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ReceiptIcon from '@mui/icons-material/Receipt';
import ViewListIcon from '@mui/icons-material/ViewList';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const SideDrawer = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <Box sx={{ width: 250 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            backgroundColor: '#f5f5f5'
          }}
        >
          <Typography variant="h6">Invoicer-wiz</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          <ListItem button component={Link} to="/" onClick={onClose}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/create-bill" onClick={onClose}>
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="List Bill" />
          </ListItem>
          <ListItem button component={Link} to="/list" onClick={onClose}>
            <ListItemIcon>
              <ViewListIcon />
            </ListItemIcon>
            <ListItemText primary="View Bills" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default SideDrawer;
