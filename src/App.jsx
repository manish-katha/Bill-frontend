import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import MenuBar from "./components/layout/MenuBar";
import SideDrawer from "./components/layout/SideDrawer";
import LoginPage from "./components/auth/LoginPage";
import SignupPage from "./components/auth/SignupPage";
import CreateBillPage from "./pages/CreateBillPage";
import Invoice from "./pages/ViewBillPage";
import DashboardPage from "./pages/DashboardPage";
import BillList from "./pages/ListBill";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation(); // Get the current location

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Check if the current path is login or signup
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!isAuthPage && <MenuBar onDrawerToggle={toggleDrawer} />}
      {!isAuthPage && <SideDrawer open={drawerOpen} onClose={toggleDrawer} />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-bill" element={<CreateBillPage />} />
        <Route path="/view-bills/:id" element={<Invoice />} />
        <Route path="/list" element={<BillList />} />
        <Route path="/" element={<BillList />} />
      </Routes>
    </>
  );
}

// Wrap App with Router to allow useLocation to work
function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
