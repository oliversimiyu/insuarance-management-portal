import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaFileAlt, 
  FaUsers, 
  FaClipboardList, 
  FaMoneyBillWave, 
  FaChartBar, 
  FaCog 
} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar py-3">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaHome className="me-2" /> Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/policies" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaFileAlt className="me-2" /> Policies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/clients" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaUsers className="me-2" /> Clients
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/claims" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaClipboardList className="me-2" /> Claims
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/payments" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaMoneyBillWave className="me-2" /> Payments
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/reports" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaChartBar className="me-2" /> Reports
          </NavLink>
        </li>
        <li className="nav-item mt-3">
          <NavLink to="/profile" className={({isActive}) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <FaCog className="me-2" /> Settings
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
