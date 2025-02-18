import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminData } from "../redux/action";
import { selectCurrentUser } from "../redux/selector";
import { RiShoppingBag3Fill,RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaUsers,FaBoxes } from "react-icons/fa";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Footer from "./Footer";
import '../styles/admin.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Admin = () => {
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.cart.adminData);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (currentUser && currentUser.role === "admin") {
      dispatch(fetchAdminData());
    }
  }, [dispatch, currentUser]);

  if (!currentUser || currentUser.role !== "admin") {
    return <div className="access-denied">Access Denied</div>;
  }

  const paymentModes = Object.keys(adminData.paymentModePercentages || {});
  const paymentValues = paymentModes.map(mode => adminData.paymentModePercentages[mode]);

  const chartData = {
    labels: paymentModes,
    datasets: [
      {
        label: 'Payment Mode Percentage',
        data: paymentValues,
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 3,
      },
    ],
  };

  return (
    <>
      <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard
        <img src="./dashboard.png" alt="" />
      </h2>
      <div className="admin-stats">
        <div className="stat-card">
          <FaUsers className="stat-icon" size={40} />
          <h3>Total Users</h3>
          <p>{adminData.totalUsers}</p>
        </div>
        <div className="stat-card">
          <RiShoppingBag3Fill className="stat-icon" size={40} />
          <h3>Total Orders</h3>
          <p>{adminData.totalOrders}</p>
        </div>
        <div className="stat-card">
          <FaBoxes className="stat-icon" size={40} />
          <h3>Total Items Sold</h3>
          <p>{adminData.totalItemsSold}</p>
        </div>
        <div className="stat-card">
          <RiMoneyRupeeCircleFill className="stat-icon" size={40} />
          <h3>Total Revenue</h3>
          <p>₹{adminData.totalRevenue}</p>
        </div>
      </div>
      <div className="payment-mode-chart">
        <h3>Payment Mode Distribution
          <img src="./analytics.gif" alt="" />
        </h3>
        <Bar data={chartData} options={{ responsive: true }} />
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Admin;